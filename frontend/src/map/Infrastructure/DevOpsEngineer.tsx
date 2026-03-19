import { useNavigate } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function DevOpsEngineer() {
    const navigate = useNavigate();
    const { isModalOpen, selectedStage, openModal, closeModal } = useStageModal();

    const stages = [
        'Основы Linux',
        'Скриптинг (Python/bash)',
        'Системы контроля версий (Git)',
        'CI/CD основы',
        'Docker и контейнеризация',
        'Kubernetes и оркестрация',
        'Jenkins/GitLab CI',
        'Управление конфигурацией',
        'Ansible/Puppet/Chef',
        'Terraform (IaC)',
        'Облачные платформы (AWS/Azure)',
        'Мониторинг (Prometheus/Grafana)',
        'Логирование (ELK Stack)',
        'Сетевая безопасность',
        'Микросервисная архитектура',
        'Service Mesh',
        'SRE практики',
        'Оптимизация и масштабирование'
    ];

    return (
        <footer>
            <div className="NameOfActivity">DevOps-инженер</div>
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

export default DevOpsEngineer;