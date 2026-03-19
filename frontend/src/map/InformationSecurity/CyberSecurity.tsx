import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function CyberSecurity() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы информационной безопасности',
        'Сетевые протоколы и архитектура',
        'Операционные системы (Windows/Linux)',
        'Криптография и шифрование',
        'Безопасность сетей (Firewalls/VPN)',
        'Ethical Hacking и пентест',
        'Kali Linux и инструменты',
        'Анализ уязвимостей',
        'Web-безопасность (OWASP)',
        'Безопасность приложений',
        'SOC и мониторинг угроз',
        'SIEM системы',
        'Форензика и расследования',
        'Reverse Engineering',
        'Malware Analysis',
        'Безопасность в облаках',
        'Standards (ISO 27001, GDPR)',
        'Red Teaming и Blue Teaming'
    ];

    return (
        <footer>
            <div className="NameOfActivity">CyberSecurity</div>
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

export default CyberSecurity;