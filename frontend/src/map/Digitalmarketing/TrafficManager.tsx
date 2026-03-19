import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function TrafficManager() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы интернет-маркетинга',
        'Яндекс.Директ и Google Ads',
        'Контекстная реклама',
        'Таргетированная реклама (VK/MyTarget)',
        'Реклама в Telegram',
        'Медийная реклама',
        'Ретаргетинг и ремаркетинг',
        'Работа с ключевыми словами',
        'Составление объявлений',
        'Анализ аудиторий',
        'Воронки продаж',
        'Метрики и KPI (CTR/CR/ROI)',
        'Веб-аналитика (Яндекс.Метрика/GA)',
        'Сквозная аналитика',
        'Бюджетирование и ставки',
        'Оптимизация кампаний',
        'А/Б тестирование',
        'Мультиканальные стратегии'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Трафик-менеджер</div>
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

export default TrafficManager;