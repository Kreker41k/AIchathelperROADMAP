from flask import Flask, request, jsonify
from flask_cors import CORS
from chat_bot import CareerBot
import os

app = Flask(__name__)
CORS(app)  # Разрешаем CORS для запросов с фронтенда

# Инициализируем бота
bot = CareerBot(os.path.join(os.path.dirname(__file__), "StageModal/StageData.json"))

@app.route('/api/chat', methods=['POST'])
def chat():
    """Обрабатывает сообщения от пользователя"""
    data = request.json
    user_id = data.get('user_id', 'default_user')
    message = data.get('message', '')
    
    if not message:
        return jsonify({'error': 'Сообщение не может быть пустым'}), 400
    
    response = bot.process_message(user_id, message)
    return jsonify(response)

@app.route('/api/roadmap/<specialty>', methods=['GET'])
def get_roadmap(specialty):
    """Возвращает roadmap для конкретной профессии"""
    # Ищем профессию в данных
    for key in bot.roadmap_data.keys():
        if specialty.lower() in key.lower():
            return jsonify({
                'specialty': key,
                'stages': bot.roadmap_data[key]
            })
    
    return jsonify({'error': 'Профессия не найдена'}), 404

@app.route('/api/specialties', methods=['GET'])
def get_specialties():
    """Возвращает список всех профессий"""
    specialties = []
    for key in bot.roadmap_data.keys():
        specialties.append({
            'id': key,
            'name': bot.get_display_name(key)
        })
    
    return jsonify(specialties)

@app.route('/api/reset/<user_id>', methods=['POST'])
def reset_session(user_id):
    """Сбрасывает сессию пользователя"""
    if user_id in bot.user_sessions:
        del bot.user_sessions[user_id]
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)