import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function SMMManager() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы SMM и маркетинга',
        'Анализ целевой аудитории',
        'Разработка контент-стратегии',
        'Визуальный контент (Canva/Figma)',
        'Копирайтинг для соцсетей',
        'Ведение сообществ (VK/TG/Instagram)',
        'Таргетированная реклама',
        'Работа с блогерами и лидерами мнений',
        'Конкурсы и спецпроекты',
        'SMM-аналитика и метрики',
        'Планирование и контент-план',
        'Сторителлинг и бренд-войс',
        'Комьюнити-менеджмент',
        'Работа с негативом',
        'Создание видео-контента (Reels)',
        'Автоматизация SMM',
        'Тренды соцсетей',
        'Отчетность и презентации'
    ];

    return (
        <footer>
            <div className="NameOfActivity">SMM-менеджер</div>
            <button className="GoBackbtn" onClick={() => navigate('/Digitalmarketing')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#eb4141')}
                        title="Нажмите для подробной информации"
                    >
                        {stage}
                    </div>
                ))}
            </div>

            <StageModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                stageData={selectedStage}
            />
        </footer>
    );
}

export default SMMManager;