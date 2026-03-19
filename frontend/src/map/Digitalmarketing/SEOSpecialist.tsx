import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function SEOSpecialist() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы SEO и поисковых систем',
        'Принципы работы алгоритмов',
        'Сбор семантического ядра',
        'Кластеризация запросов',
        'Внутренняя оптимизация',
        'Мета-теги и заголовки',
        'Техническое SEO',
        'Аудит сайта (Netpeak Screamer)',
        'Факторы ранжирования',
        'Внешняя оптимизация (линкбилдинг)',
        'Коммерческие факторы',
        'Поведенческие факторы',
        'SEO-аналитика (Яндекс.Метрика)',
        'Работа с краулерами',
        'Мониторинг позиций',
        'SEO для e-commerce',
        'Мобильное SEO',
        'Отчеты и KPI'
    ];

    return (
        <footer>
            <div className="NameOfActivity">SEO-специалист</div>
            <button className="GoBackbtn" onClick={() => navigate('/Digitalmarketing')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#eb4141')}
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

export default SEOSpecialist;