import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function UIUXDesigner() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы дизайна и композиции',
        'Типографика и цвет',
        'Figma (интерфейс и инструменты)',
        'UX-исследования',
        'Personas и CJM',
        'Информационная архитектура',
        'Прототипирование (Lo-fi/Hi-fi)',
        'UI-дизайн и компоненты',
        'Дизайн-системы',
        'Адаптивный дизайн',
        'Tilda и no-code инструменты',
        'Анимация интерфейсов',
        'Тестирование юзабилити',
        'Взаимодействие с разработкой',
        'Портфолио и кейсы',
        'Дизайн мобильных приложений',
        'Web-дизайн',
        'Дизайн-мышление'
    ];

    return (
        <footer>
            <div className="NameOfActivity">UI/UX-дизайнер</div>
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

export default UIUXDesigner;