import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function SystemAdministrator() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы компьютерных сетей',
        'ОС Windows Server',
        'ОС Linux (Ubuntu/CentOS)',
        'Командная строка и bash',
        'Сетевое администрирование',
        'Active Directory и домены',
        'Виртуализация (VMware/Hyper-V)',
        'Резервное копирование',
        'Мониторинг систем',
        'DNS и DHCP',
        'Электронная почта (Exchange)',
        'Файловые сервера',
        'Безопасность и фаерволы',
        'Скриптинг (PowerShell/bash)',
        'Обновления и патчи',
        'Help Desk и поддержка',
        'Документирование',
        'Облачная инфраструктура'
    ];

    return (
        <footer>
            <div className="NameOfActivity">Системный администратор</div>
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

export default SystemAdministrator;