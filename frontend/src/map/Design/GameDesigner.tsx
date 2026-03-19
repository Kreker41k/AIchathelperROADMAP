import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function GameDesigner() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы геймдизайна',
        'Игровые механики',
        'Нарративный дизайн',
        'Балансировка игр',
        'Уровни и левел-дизайн',
        'Экономика в играх',
        'Игровые жанры и референсы',
        'Прототипирование игр',
        'Unity/Unreal основы',
        'Геймдизайн-документация',
        'Монетизация (F2P/Premium)',
        'Метрики и аналитика',
        'Игровой баланс',
        'Психология игрока',
        'Саунд-дизайн',
        'UX в играх',
        'Тестирование игр',
        'Питчинг и презентации'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Game-дизайнер</div>
            <button className="GoBackbtn" onClick={() => navigate('/Design')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#944fcc')}
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

export default GameDesigner;