import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function Backend() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы программирования',
        'Языки программирования',
        'Базы данных',
        'API и микросервисы',
        'Безопасность',
        'Инструменты и DevOps',
        'Архитектура ПО',
        'Мониторинг и логирование',
        'Масштабирование',
        'Облачные технологии'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Backend</div>
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

export default Backend;