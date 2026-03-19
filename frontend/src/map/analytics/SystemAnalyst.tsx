import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function SystemAnalyst() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();


    const stages = [
        'Основы программирования',
        'Базы данных и SQL',
        'Архитектура ПО',
        'UML и моделирование',
        'Сбор требований',
        'Документирование (SRS)',
        'Прототипирование интерфейсов',
        'API дизайн (REST/SOAP)',
        'Интеграция систем',
        'BPMN и нотации',
        'Agile и методологии',
        'Тестирование и валидация',
        'Анализ рисков',
        'Enterprise архитектура',
        'Переговоры и коммуникация',
        'Управление требованиями',
        'Технические спецификации',
        'Миграция данных'
    ];

    return (
        <footer>
            <div className="NameOfActivity">System Analyst</div>
            <button className="GoBackbtn" onClick={() => navigate('/DataAnalytics')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#66ea75')}
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

export default SystemAnalyst;