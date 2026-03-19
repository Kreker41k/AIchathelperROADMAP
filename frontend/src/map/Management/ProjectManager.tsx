import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function ProjectManager() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы управления проектами',
        'Методологии (Waterfall/Agile)',
        'Scrum и Kanban',
        'Планирование и оценка',
        'Управление рисками',
        'Бюджетирование',
        'Командообразование',
        'Коммуникации и отчеты',
        'Jira/Trello/Asana',
        'Управление стейкхолдерами',
        'Контроль качества',
        'Управление изменениями',
        'Переговоры и конфликты',
        'Презентация результатов',
        'Метрики проекта',
        'Ретроспективы',
        'Портфельное управление',
        'Сертификация (PMP/PRINCE2)'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Project Manager</div>
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

export default ProjectManager;