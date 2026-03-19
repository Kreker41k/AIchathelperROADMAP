import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function QAEngineer() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы тестирования ПО',
        'Жизненный цикл разработки',
        'Виды и уровни тестирования',
        'Тест-дизайн и техники',
        'Тест-кейсы и чек-листы',
        'Багрепортинг (Jira/YouTrack)',
        'SQL для тестировщика',
        'Тестирование API (Postman)',
        'DevTools и отладка',
        'Тестирование веб-приложений',
        'Тестирование мобильных приложений',
        'Клиент-серверная архитектура',
        'Автоматизация тестирования',
        'Selenium и Playwright',
        'Языки программирования (Python/JS)',
        'CI/CD в тестировании',
        'Нагрузочное тестирование',
        'Тестирование безопасности'
    ];

    return (
        <footer>
            <div className="NameOfActivity">QA инженер</div>
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

export default QAEngineer;