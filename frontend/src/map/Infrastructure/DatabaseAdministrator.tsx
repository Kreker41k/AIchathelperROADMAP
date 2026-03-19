import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function DatabaseAdministrator() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы реляционных БД',
        'SQL (DDL, DML, DCL)',
        'MySQL/MariaDB',
        'PostgreSQL',
        'Microsoft SQL Server',
        'Oracle Database',
        'NoSQL (MongoDB/Redis)',
        'Проектирование БД',
        'Нормализация данных',
        'Индексы и оптимизация',
        'Резервное копирование',
        'Восстановление данных',
        'Репликация и кластеризация',
        'Мониторинг БД',
        'Профилирование запросов',
        'Безопасность и доступы',
        'Миграции данных',
        'Big Data (Hadoop/Cassandra)'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Администратор БД</div>
            <button className="GoBackbtn" onClick={() => navigate('/Infrastructure')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#95c8ed')}
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

export default DatabaseAdministrator;