import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function WebDesigner() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы веб-дизайна',
        'Adobe Photoshop/Figma',
        'Типографика в вебе',
        'Цветовые схемы',
        'Композиция и сетки',
        'Адаптивный дизайн',
        'UI-элементы и компоненты',
        'Лендинги и многостраничники',
        'Прототипирование',
        'Анимация и микро-взаимодействия',
        'Tilda/Webflow',
        'HTML/CSS основы',
        'Оптимизация графики',
        'Тренды веб-дизайна',
        'Посадка на CMS',
        'SEO-основы для дизайнера',
        'Портфолио веб-дизайнера',
        'Коммуникация с заказчиком'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Web-дизайнер</div>
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

export default WebDesigner;