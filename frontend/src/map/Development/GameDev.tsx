import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function GameDev() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы программирования',
        'Математика для игр (векторы, физика)',
        'Игровые движки (Unity/Unreal)',
        'Языки: C#/C++/Python',
        '2D и 3D графика',
        'Анимация и спрайты',
        'Физика и коллизии',
        'Игровой AI',
        'Сетевой код (мультиплеер)',
        'Оптимизация и тестирование'
    ];

    return (
        <footer>
            <div className="NameOfActivity">GameDev</div>
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

export default GameDev;