import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function InformationSecurityManager() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы информационной безопасности',
        'Стандарты и регуляторы (ISO 27001)',
        'Политики и процедуры ИБ',
        'Управление рисками',
        'GDPR и персональные данные',
        '152-ФЗ и российские законы',
        'Аудит информационной безопасности',
        'Управление инцидентами',
        'BCP и DRP (непрерывность бизнеса)',
        'Осведомленность сотрудников',
        'Управление уязвимостями',
        'Вендор-менеджмент',
        'Бюджетирование ИБ',
        'Метрики и KPI безопасности',
        'Расследование инцидентов',
        'Сертификация (CISSP/CISM)',
        'Взаимодействие с регуляторами',
        'Стратегия информационной безопасности'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Менеджер ИБ</div>
            <button className="GoBackbtn" onClick={() => navigate('/InformationSecurity')}>Назад</button>
            <div className="Roadmap">
                {stages.map((stage: string, index: number) => (
                    <div 
                        key={index} 
                        className="stage"
                        onClick={() => openModal(stage, '#930505')}
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

export default InformationSecurityManager;