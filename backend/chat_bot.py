import json
import random
import re
import numpy as np
from typing import Dict, List, Optional, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
from collections import Counter


class CareerBot:
    def __init__(self, data_path: str = "StageData.json", model_path: str = None):
        # Загрузка данных
        with open(data_path, "r", encoding="utf-8") as f:
            self.data = json.load(f)
        
        # Подготовка базы данных
        self.specialties, self.roadmap_data = self._build_specialty_database()
        
        # Расширенная векторизация с n-граммами
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 3),  # Учитываем фразы до 3 слов
            max_features=5000,
            stop_words=['это', 'как', 'так', 'и', 'в', 'над', 'к', 'но', 'на'],
            analyzer='word',
            sublinear_tf=True  # Логарифмическое масштабирование частот
        )
        
        # Подготовка данных для ML
        self.names = list(self.specialties.keys())
        self.texts = list(self.specialties.values())
        
        # Добавляем расширенные описания для лучшего матчинга
        self._enhance_specialty_descriptions()
        
        self.X = self.vectorizer.fit_transform(self.texts)
        
        # Кэш для быстрых рекомендаций
        self.similarity_cache = {}
        
        # Ключевые слова для каждой профессии (для rule-based matching)
        self.specialty_keywords = self._extract_keywords()
        
        # Состояние диалога для каждого пользователя
        self.user_sessions = {}
        
        # Расширенный словарь интереса
        self.interest_words = self._build_interest_dictionary()
        
        # Антонимы отказа (чтобы лучше понимать отрицания)
        self.negation_words = ["не", "нет", "не хочу", "не интересно", "не нравится", "не подходит"]
        
        # Словарь для преобразования названий
        self.name_mapping = self._build_name_mapping()

    def _enhance_specialty_descriptions(self):
        """Добавляет синонимы и связанные термины к описаниям профессий"""
        enhanced_texts = []
        
        # Расширение ключевыми терминами для каждой профессии
        specialty_terms = {
            "frontend": ["html", "css", "javascript", "react", "vue", "angular", "интерфейсы", "сайты", "верстка"],
            "backend": ["python", "java", "php", "c#", "сервер", "api", "базы данных", "логика"],
            "fullstack": ["фронтенд", "бэкенд", "полный стек", "javascript", "python", "базы данных"],
            "dataScientist": ["машинное обучение", "нейросети", "анализ данных", "python", "статистика"],
            "uiUxDesigner": ["дизайн", "интерфейсы", "figma", "photoshop", "пользовательский опыт"],
            "qaEngineer": ["тестирование", "баги", "автоматизация", "качество", "ошибки"],
            # Добавьте остальные профессии...
        }
        
        for i, specialty in enumerate(self.names):
            base_text = self.texts[i]
            clean_name = specialty.replace("Stages", "").lower()
            
            # Добавляем ключевые термины
            for key, terms in specialty_terms.items():
                if key in clean_name:
                    base_text += " " + " ".join(terms)
                    break
            
            enhanced_texts.append(base_text)
        
        self.texts = enhanced_texts

    def _extract_keywords(self) -> Dict[str, List[str]]:
        """Извлекает ключевые слова для каждой профессии"""
        keywords = {}
        
        for specialty in self.names:
            # Получаем все тексты для профессии
            stages = self.roadmap_data.get(specialty, [])
            all_text = []
            
            for stage in stages:
                all_text.extend(stage.get('topics', []))
                all_text.extend(stage.get('skills', []))
            
            # Находим самые частотные слова
            word_counts = Counter()
            for text in all_text:
                words = text.lower().split()
                word_counts.update(words)
            
            # Берем топ-10 ключевых слов
            keywords[specialty] = [word for word, _ in word_counts.most_common(10)]
        
        return keywords

    def _build_interest_dictionary(self) -> List[str]:
        """Строит расширенный словарь слов, выражающих интерес"""
        return [
            "да", "интересно", "хочу", "подробнее", "расскажи", "как начать",
            "подходит", "ок", "давай", "конечно", "согласен", "посмотрим",
            "хорошо", "yes", "ага", "звучит", "отлично", "супер", "классно",
            "замечательно", "поехали", "давайте", "можно", "буду", "хотел",
            "хотелось", "интерес", "узнать", "попробовать", "начинать",
            "старт", "приступить", "готов", "жду", "ждун", "ждущий"
        ]

    def _build_name_mapping(self) -> Dict[str, str]:
        """Строит маппинг названий профессий"""
        return {
            "frontend": "Frontend-разработчик (создание интерфейсов сайтов и приложений)",
            "backend": "Backend-разработчик (серверная часть, базы данных, API)",
            "fullstack": "Fullstack-разработчик (и фронтенд, и бэкенд)",
            "mobdev": "Мобильный разработчик (iOS/Android приложения)",
            "gamedev": "GameDev-разработчик (создание игр)",
            "dataAnalyst": "Data Analyst (аналитик данных)",
            "dataScientist": "Data Scientist (специалист по машинному обучению и AI)",
            "businessAnalyst": "Business Analyst (бизнес-аналитик)",
            "systemAnalyst": "System Analyst (системный аналитик)",
            "projectManager": "Project Manager (менеджер проектов)",
            "productManager": "Product Manager (продуктовый менеджер)",
            "itRecruiter": "IT-рекрутер (поиск IT-специалистов)",
            "systemAdministrator": "Системный администратор (поддержка IT-инфраструктуры)",
            "devopsEngineer": "DevOps-инженер (автоматизация разработки и эксплуатации)",
            "databaseAdministrator": "Администратор баз данных",
            "cyberSecurity": "Специалист по кибербезопасности",
            "informationSecurityManager": "Менеджер информационной безопасности",
            "qaEngineer": "QA-инженер (тестировщик)",
            "softwareTester": "Тестировщик ПО",
            "uiUxDesigner": "UI/UX-дизайнер (проектирование интерфейсов)",
            "webDesigner": "Веб-дизайнер",
            "gameDesigner": "Гейм-дизайнер",
            "seoSpecialist": "SEO-специалист (продвижение сайтов)",
            "smmManager": "SMM-менеджер (маркетинг в соцсетях)",
            "trafficManager": "Трафик-менеджер (настройка рекламы)"
        }

    def _build_specialty_database(self):
        """Преобразует JSON-данные в форматы для поиска и отображения"""
        specialties = {}
        roadmap_data = {}

        for specialty, stages in self.data.items():
            full_text = ""
            stage_list = []

            for stage_id, stage in stages.items():
                title = stage.get("title", "")
                description = stage.get("description", "")
                topics = stage.get("keyTopics", [])
                skills = stage.get("skills", [])

                # Добавляем вес для разных частей
                stage_text = f"{title} {description} "
                stage_text += " ".join(topics) * 2  # Удваиваем вес ключевых тем
                stage_text += " ".join(skills) * 2  # Удваиваем вес навыков
                
                full_text += " " + stage_text

                stage_list.append({
                    "title": title,
                    "description": description,
                    "topics": topics,
                    "skills": skills,
                    "importance": stage.get("importance", ""),
                    "resources": stage.get("resources", []),
                    "timeToLearn": stage.get("timeToLearn", "")
                })

            specialties[specialty] = full_text
            roadmap_data[specialty] = stage_list

        return specialties, roadmap_data

    def get_or_create_session(self, user_id: str) -> Dict:
        """Получает или создает сессию для пользователя"""
        if user_id not in self.user_sessions:
            self.user_sessions[user_id] = {
                "state": "exploring",
                "current_specialty": None,
                "history": [],
                "preferences": {
                    "interests": [],
                    "dislikes": [],
                    "mentioned_skills": [],
                    "previous_recommendations": []
                }
            }
        return self.user_sessions[user_id]

    def detect_interest(self, text: str) -> Tuple[bool, float]:
        """
        Определяет, выразил ли пользователь интерес к предложенной профессии
        Возвращает (интерес, уверенность)
        """
        text = text.lower().strip()
        
        # Проверка на отрицания
        has_negation = any(neg in text for neg in self.negation_words)
        
        # Поиск слов интереса
        interest_score = 0
        for word in self.interest_words:
            if word in text:
                interest_score += 1
        
        # Нормализация
        confidence = min(interest_score / len(text.split()), 1.0) if text else 0
        
        # Если есть отрицания, инвертируем при низкой уверенности
        if has_negation and confidence < 0.3:
            return False, 0.8
        
        # Короткие утвердительные ответы
        if len(text) <= 3 and text in ["да", "ок", "ok", "yes", "ага", "y"]:
            return True, 1.0
        
        return interest_score > 0, confidence

    def rule_based_recommendation(self, user_text: str) -> Optional[str]:
        """Правила для точного матчинга по ключевым словам"""
        user_text_lower = user_text.lower()
        
        # Прямые соответствия
        for specialty, keywords in self.specialty_keywords.items():
            matches = 0
            for keyword in keywords[:5]:  # Проверяем топ-5 ключевых слов
                if keyword in user_text_lower:
                    matches += 1
            
            if matches >= 2:  # Если нашли минимум 2 ключевых слова
                return specialty
        
        # Проверка по названиям профессий
        for key, display_name in self.name_mapping.items():
            if key in user_text_lower or display_name.lower() in user_text_lower:
                # Ищем соответствующую профессию
                for specialty in self.names:
                    if key in specialty.lower() or key.replace(" ", "") in specialty.lower():
                        return specialty
        
        return None

    def hybrid_recommendation(self, user_text: str, user_id: str = None) -> str:
        """
        Гибридная рекомендация: сочетание rule-based и ML подходов
        """
        # Сначала пробуем rule-based
        rule_match = self.rule_based_recommendation(user_text)
        if rule_match:
            return rule_match
        
        # Затем ML подход с учетом истории
        user_vec = self.vectorizer.transform([user_text])
        similarity = cosine_similarity(user_vec, self.X)
        
        # Если есть история пользователя, корректируем веса
        if user_id and user_id in self.user_sessions:
            session = self.user_sessions[user_id]
            if session["preferences"]["previous_recommendations"]:
                # Понижаем вес уже рекомендованных профессий
                for prev in session["preferences"]["previous_recommendations"]:
                    if prev in self.names:
                        idx = self.names.index(prev)
                        similarity[0][idx] *= 0.7  # Уменьшаем на 30%
        
        index = similarity.argmax()
        return self.names[index]

    def get_display_name(self, specialty: str) -> str:
        """Возвращает красивое название профессии с пояснением"""
        clean_name = specialty.replace("Stages", "").lower()
        
        for key, value in self.name_mapping.items():
            if key.lower() in clean_name.lower():
                return value
        
        return specialty.replace("Stages", "")

    def generate_intro_response(self, specialty: str, confidence: float = 1.0) -> str:
        """Генерирует приветственное сообщение с предложением профессии"""
        openers = [
            "Похоже, вам может подойти направление",
            "Судя по вашему интересу, стоит обратить внимание на",
            "Мне кажется, вам будет интересно направление",
            "Если ориентироваться на ваш запрос, можно рассмотреть",
            "На основе ваших слов, рекомендую обратить внимание на",
            "Учитывая ваши интересы, я бы предложил рассмотреть",
            "Исходя из описанного, вам стоит присмотреться к"
        ]
        
        display_name = self.get_display_name(specialty)
        
        # Добавляем информацию об уверенности
        confidence_text = ""
        if confidence < 0.5:
            confidence_text = " (но не совсем уверен, расскажите подробнее?)"
        elif confidence < 0.8:
            confidence_text = " (достаточно вероятно)"
        else:
            confidence_text = " (очень высокая вероятность)"
        
        return f"{random.choice(openers)} **{display_name}**{confidence_text}\n\nХотите посмотреть roadmap (план обучения) этой профессии?"

    def generate_stage_details(self, stage_data: Dict, detailed: bool = True) -> str:
        """Генерирует детальное описание этапа"""
        if not stage_data:
            return "Информация по этому этапу не найдена."
        
        title = stage_data.get("title", "Без названия")
        description = stage_data.get("description", "")
        importance = stage_data.get("importance", "")
        topics = stage_data.get("topics", [])
        skills = stage_data.get("skills", [])
        resources = stage_data.get("resources", [])
        time_to_learn = stage_data.get("timeToLearn", "")
        
        if not detailed:
            return f"**{title}** - {description[:100]}..."
        
        response = f"## {title}\n\n"
        
        if importance:
            response += f"**Важность:** {importance}\n\n"
        
        if description:
            response += f"**Описание:** {description}\n\n"
        
        if time_to_learn:
            response += f"**Время изучения:** {time_to_learn}\n\n"
        
        if topics:
            response += "**Ключевые темы для изучения:**\n"
            for topic in topics[:7]:
                response += f"• {topic}\n"
            response += "\n"
        
        if skills:
            response += "**Навыки, которые получите:**\n"
            for skill in skills[:5]:
                response += f"• {skill}\n"
            response += "\n"
        
        if resources:
            response += "**Полезные ресурсы:**\n"
            for resource in resources[:4]:
                response += f"• {resource}\n"
        
        return response

    def get_first_steps(self, specialty: str) -> Dict:
        """Возвращает информацию о первых шагах в профессии"""
        stages = self.roadmap_data.get(specialty, [])
        if not stages:
            return None
        
        return stages[0]

    def extract_user_preferences(self, message: str, session: Dict):
        """Извлекает предпочтения пользователя из сообщения"""
        message_lower = message.lower()
        
        # Ищем упомянутые технологии/навыки
        common_skills = ["python", "javascript", "java", "c++", "html", "css", "sql", 
                        "react", "angular", "vue", "design", "figma", "photoshop"]
        
        for skill in common_skills:
            if skill in message_lower and skill not in session["preferences"]["mentioned_skills"]:
                session["preferences"]["mentioned_skills"].append(skill)
        
        # Определяем общую область интересов
        interest_areas = {
            "web": ["сайт", "веб", "интернет", "онлайн"],
            "mobile": ["мобильн", "app", "ios", "android"],
            "data": ["данн", "анализ", "ml", "ai", "нейросет"],
            "design": ["дизайн", "интерфейс", "ui", "ux", "график"],
            "games": ["игр", "game", "unity", "unreal"],
            "security": ["безопасн", "security", "защит"],
            "testing": ["тест", "qa", "качество"],
            "admin": ["админ", "сервер", "сет", "linux"]
        }
        
        for area, keywords in interest_areas.items():
            for keyword in keywords:
                if keyword in message_lower:
                    if area not in session["preferences"]["interests"]:
                        session["preferences"]["interests"].append(area)
                    break

    def process_message(self, user_id: str, message: str) -> Dict:
        """Обрабатывает сообщение пользователя и возвращает ответ"""
        session = self.get_or_create_session(user_id)
        session["history"].append({"user": message})
        
        # Извлекаем предпочтения из сообщения
        self.extract_user_preferences(message, session)
        
        response = {
            "text": "",
            "specialty": None,
            "stage": None,
            "link": None,
            "state": session["state"],
            "confidence": 1.0
        }
        
        # Этап поиска профессии
        if session["state"] == "exploring":
            # Используем гибридную рекомендацию
            specialty = self.hybrid_recommendation(message, user_id)
            session["current_specialty"] = specialty
            
            # Добавляем в историю рекомендаций
            if specialty not in session["preferences"]["previous_recommendations"]:
                session["preferences"]["previous_recommendations"].append(specialty)
            
            # Оцениваем уверенность
            confidence = self._calculate_confidence(message, specialty)
            response["confidence"] = confidence
            
            response["text"] = self.generate_intro_response(specialty, confidence)
            response["specialty"] = specialty
            session["state"] = "suggested"
        
        # Этап интереса
        elif session["state"] == "suggested":
            interest, confidence = self.detect_interest(message)
            
            if interest:
                specialty = session["current_specialty"]
                first_step = self.get_first_steps(specialty)
                
                if first_step:
                    response["text"] = f"**Отлично! Вот с чего обычно начинают путь в этой профессии:**\n\n"
                    response["text"] += f"### 📍 {first_step['title']}\n\n"
                    
                    if first_step.get('description'):
                        response["text"] += f"{first_step['description']}\n\n"
                    
                    response["text"] += "**Ключевые темы для старта:**\n"
                    for topic in first_step.get('topics', [])[:5]:
                        response["text"] += f"• {topic}\n"
                    
                    response["text"] += "\n**Хотите узнать про следующий этап или подробности по конкретной теме?**"
                else:
                    response["text"] = "Извините, не могу найти информацию о первых шагах для этой профессии."
                
                response["stage"] = first_step
                response["link"] = f"/{specialty.replace('Stages', '').lower()}"
                response["specialty"] = specialty
                session["state"] = "learning"  # Новое состояние для обучения
            else:
                # Пользователь не заинтересован
                response["text"] = "Понимаю. Давайте попробуем подобрать другое направление. Расскажите подробнее, что вам интересно?"
                
                # Запоминаем неподходящую профессию
                if session["current_specialty"] not in session["preferences"]["dislikes"]:
                    session["preferences"]["dislikes"].append(session["current_specialty"])
                
                session["state"] = "exploring"
        
        # Этап обучения (после показа первых шагов)
        elif session["state"] == "learning":
            specialty = session["current_specialty"]
            stages = self.roadmap_data.get(specialty, [])
            
            # Проверяем, просит ли пользователь следующий этап
            next_stage_indicators = ["дальше", "следующий", "потом", "далее", "next", "после"]
            if any(ind in message.lower() for ind in next_stage_indicators):
                # Ищем текущий этап в истории
                current_stage_index = self._find_current_stage_index(session)
                
                if current_stage_index is not None and current_stage_index + 1 < len(stages):
                    next_stage = stages[current_stage_index + 1]
                    response["text"] = self.generate_stage_details(next_stage)
                    response["stage"] = next_stage
                    session["current_stage_index"] = current_stage_index + 1
                elif current_stage_index is not None and current_stage_index + 1 >= len(stages):
                    response["text"] = "Это был последний этап! Хотите рассмотреть другую профессию?"
                    session["state"] = "exploring"
                else:
                    # Если не знаем текущий этап, показываем второй этап
                    if len(stages) > 1:
                        response["text"] = self.generate_stage_details(stages[1])
                        response["stage"] = stages[1]
                        session["current_stage_index"] = 1
                    else:
                        response["text"] = "Больше этапов не найдено. Хотите другую профессию?"
                        session["state"] = "exploring"
            
            # Проверяем, спрашивает ли о конкретном этапе
            else:
                found_stage = None
                for i, stage in enumerate(stages):
                    if stage['title'].lower() in message.lower():
                        found_stage = stage
                        session["current_stage_index"] = i
                        break
                
                if found_stage:
                    response["text"] = self.generate_stage_details(found_stage)
                    response["stage"] = found_stage
                elif self.detect_interest(message)[0]:  # Если интерес к другой профессии
                    session["state"] = "exploring"
                    return self.process_message(user_id, message)
                else:
                    response["text"] = ("Что именно вас интересует?\n"
                                       "• Напишите 'дальше' для следующего этапа\n"
                                       "• Назовите конкретный этап для подробностей\n"
                                       "• Напишите 'новая' для другой профессии")
        
        # Завершение (старое состояние, оставлено для совместимости)
        elif session["state"] == "finished":
            if self.detect_interest(message)[0]:
                session["state"] = "exploring"
                return self.process_message(user_id, message)
            else:
                # Проверяем, не спрашивает ли пользователь о конкретном этапе
                stages = self.roadmap_data.get(session["current_specialty"], [])
                found_stage = None
                for stage in stages:
                    if stage['title'].lower() in message.lower():
                        found_stage = stage
                        break
                
                if found_stage:
                    response["text"] = self.generate_stage_details(found_stage)
                    response["stage"] = found_stage
                else:
                    response["text"] = "Хотите рассмотреть ещё одну профессию или узнать подробнее о каком-то этапе?\n• Напишите 'да' чтобы выбрать новую профессию"
        
        session["history"].append({"bot": response["text"]})
        response["state"] = session["state"]
        
        return response

    def _calculate_confidence(self, message: str, specialty: str) -> float:
        """Рассчитывает уверенность в рекомендации"""
        # Базовая уверенность от ML
        user_vec = self.vectorizer.transform([message])
        similarity = cosine_similarity(user_vec, self.X)
        ml_confidence = similarity[0][self.names.index(specialty)]
        
        # Уверенность от rule-based
        rule_confidence = 0.0
        if self.rule_based_recommendation(message) == specialty:
            rule_confidence = 0.8
        
        # Комбинируем
        return max(ml_confidence, rule_confidence)

    def _find_current_stage_index(self, session: Dict) -> Optional[int]:
        """Находит индекс текущего этапа в сессии"""
        if "current_stage_index" in session:
            return session["current_stage_index"]
        
        # Пытаемся найти по истории
        specialty = session["current_specialty"]
        stages = self.roadmap_data.get(specialty, [])
        
        for i, msg in enumerate(session["history"]):
            if "bot" in msg and "Вот с чего обычно начинают" in msg["bot"]:
                return i
        
        return 0  # По умолчанию первый этап