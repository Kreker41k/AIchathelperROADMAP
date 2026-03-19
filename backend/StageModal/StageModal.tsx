import React, { useEffect } from 'react';
import './StageModal.scss';

interface StageInfo {
    title: string;
    importance: string;
    description: string;
    keyTopics: string[];
    resources: string[];
    timeToLearn: string;
    skills: string[];
}

interface StageModalProps {
    isOpen: boolean;
    onClose: () => void;
    stageData: StageInfo | null;
    gradientColor?: string;
}

const StageModal: React.FC<StageModalProps> = ({ isOpen, onClose, stageData, gradientColor = '#667eea' }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') onClose();
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !stageData) return null;

    const headerStyle = {
        background: `linear-gradient(135deg, ${gradientColor} 0%, #4834d4 100%)`
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-header" style={headerStyle}>
                    <h2>{stageData.title}</h2>
                    <div className="time-badge">{stageData.timeToLearn}</div>
                </div>

                <div className="modal-body">
                    <section className="importance-section">
                        <h3>Важность этапа</h3>
                        <p>{stageData.importance}</p>
                    </section>

                    <section className="description-section">
                        <h3>Описание</h3>
                        <p>{stageData.description}</p>
                    </section>

                    <section className="topics-section">
                        <h3>Ключевые темы для изучения</h3>
                        <ul>
                            {stageData.keyTopics.map((topic: string, index: number) => (
                                <li key={index}>{topic}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="skills-section">
                        <h3>Навыки, которые вы получите</h3>
                        <ul>
                            {stageData.skills.map((skill: string, index: number) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="resources-section">
                        <h3>Ресурсы для изучения</h3>
                        <ul>
                            {stageData.resources.map((resource: string, index: number) => (
                                <li key={index}>{resource}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default StageModal;