import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function Fullstack() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы веб-разработки',
        'Frontend: HTML/CSS/JS',
        'Frontend: Фреймворки (React/Vue/Angular)',
        'Backend: Языки (Node.js/Python/PHP)',
        'Backend: Фреймворки (Express/Django/Laravel)',
        'Базы данных (SQL и NoSQL)',
        'API (REST, GraphQL)',
        'Аутентификация и безопасность',
        'DevOps и деплой',
        'Архитектура приложений'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Fullstack</div>
            <button className="GoBackbtn" onClick={() => navigate('/Development')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage, index) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#667eea')}
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

export default Fullstack;