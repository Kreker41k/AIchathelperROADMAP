import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function DataScientist() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();


    const stages = [
        'Математический анализ',
        'Линейная алгебра',
        'Теория вероятностей',
        'Статистика',
        'Python основы',
        'Pandas и NumPy',
        'Визуализация данных',
        'SQL для аналитики',
        'Машинное обучение основы',
        'Scikit-learn',
        'Глубокое обучение',
        'TensorFlow/PyTorch',
        'Big Data инструменты',
        'Feature Engineering',
        'Оценка моделей',
        'ML в продакшене',
        'A/B тестирование',
        'Исследовательский анализ'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Data Scientist</div>
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

export default DataScientist;