import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function SoftwareTester() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы тестирования',
        'Терминология и понятия',
        'Тестовая документация',
        'Чек-листы и тест-кейсы',
        'Баг-трекинговые системы',
        'Функциональное тестирование',
        'UI/UX тестирование',
        'Регрессионное тестирование',
        'Smoke и sanity тестирование',
        'Тестирование форм и полей',
        'Кроссбраузерное тестирование',
        'Адаптивная верстка',
        'Тестирование интеграций',
        'Работа с логами',
        'Тестирование требований',
        'Приемочное тестирование',
        'Исследовательское тестирование',
        'Отчеты о тестировании'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Тестировщик ПО</div>
            <button className="GoBackbtn" onClick={() => navigate('/Testing')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#9b5f3a')}
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

export default SoftwareTester;