import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function BusinessAnalyst() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();


    const stages = [
        'Основы экономики',
        'Бизнес-процессы',
        'Методологии (BPMN, IDEF0)',
        'Сбор требований',
        'Анализ стейкхолдеров',
        'SWOT и PEST анализ',
        'Финансовое моделирование',
        'Agile и Scrum',
        'User Stories и Use Cases',
        'Приоритизация (MoSCoW)',
        'Прототипирование',
        'Анализ рынка',
        'KPI и метрики',
        'Управление изменениями',
        'Переговоры и презентации',
        'Бизнес-кейсы',
        'Оценка эффективности',
        'Внедрение решений'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Business Analyst</div>
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

export default BusinessAnalyst;