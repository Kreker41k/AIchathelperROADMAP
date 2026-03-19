import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function MobDev() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы программирования',
        'Выбор платформы (iOS/Android)',
        'Языки: Swift/Kotlin/Java',
        'Кроссплатформа (React Native/Flutter)',
        'UI/UX для мобильных устройств',
        'Работа с API и базами данных',
        'Хранение данных на устройстве',
        'Работа с камерой/сенсорами/GPS',
        'Публикация в магазины приложений',
        'Монетизация и аналитика'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Mobile Developer</div>
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

export default MobDev;