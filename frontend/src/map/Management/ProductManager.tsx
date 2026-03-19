import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function ProductManager() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы продуктового мышления',
        'Анализ рынка и конкурентов',
        'Исследование пользователей',
        'CJM и UX-дизайн',
        'Продуктовая стратегия',
        'Roadmap продукта',
        'Метрики продукта',
        'A/B тестирование',
        'Unit-экономика',
        'Продуктовая аналитика',
        'MVP и гипотезы',
        'Приоритизация фич',
        'Бэклог продукта',
        'Продуктовые исследования',
        'Монетизация и цены',
        'Запуск продукта',
        'Ретеншн и вовлечение',
        'Скалирование продукта'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Product Manager</div>
            <button className="GoBackbtn" onClick={() => navigate('/Management')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#ea9266')}
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

export default ProductManager;