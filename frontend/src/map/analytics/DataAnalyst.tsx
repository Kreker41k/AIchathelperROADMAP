import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function DataAnalyst() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();


    const stages = [
        'Основы статистики',
        'Excel и Google Sheets',
        'SQL для аналитики',
        'Python основы',
        'Pandas и NumPy',
        'Визуализация данных',
        'Tableau/Power BI',
        'Метрики и KPI',
        'A/B тестирование',
        'Продуктовая аналитика',
        'Когортный анализ',
        'RFM-анализ',
        'Прогнозирование',
        'Data Storytelling',
        'Очистка данных',
        'ETL процессы',
        'Автоматизация отчетов',
        'Бизнес-метрики'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Data Analyst</div>
            <button className="GoBackbtn" onClick={() => navigate('/DataAnalytics')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#66ea75')}
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

export default DataAnalyst;