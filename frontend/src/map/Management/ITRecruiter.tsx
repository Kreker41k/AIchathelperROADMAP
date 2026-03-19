import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function ITRecruiter() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы рекрутмента',
        'IT-терминология',
        'Поиск кандидатов (сорсинг)',
        'LinkedIn и соцсети',
        'Job Boards и X-Ray',
        'Оценка резюме',
        'Технологии и стек',
        'Скрининг интервью',
        'Оценка hard skills',
        'Оценка soft skills',
        'Коммуникация с кандидатами',
        'Воронка подбора',
        'HR-бренд работодателя',
        'Оффер и закрытие вакансии',
        'Адаптация сотрудников',
        'Рынок зарплат',
        'Автоматизация рекрутмента',
        'Аналитика подбора'
    ];

    return (
        <footer>
            <div className="NameOfActivity">IT-рекрутер</div>
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

export default ITRecruiter;