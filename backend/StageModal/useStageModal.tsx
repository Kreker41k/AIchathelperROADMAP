import { useState } from 'react';
import stageData from './StageData.json';

// Определяем тип для данных этапа
interface StageInfo {
    title: string;
    importance: string;
    description: string;
    keyTopics: string[];
    resources: string[];
    timeToLearn: string;
    skills: string[];
}

// Тип для всех данных
interface StageData {
    frontendStages: Record<string, StageInfo>;
    backendStages: Record<string, StageInfo>;
    fullstackStages: Record<string, StageInfo>;
    mobdevStages: Record<string, StageInfo>;
    gamedevStages: Record<string, StageInfo>;
    businessAnalystStages: Record<string, StageInfo>;
    dataAnalystStages: Record<string, StageInfo>;
    dataScientistStages: Record<string, StageInfo>;
    systemAnalystStages: Record<string, StageInfo>;
    projectManagerStages: Record<string, StageInfo>;
    productManagerStages: Record<string, StageInfo>;
    itRecruiterStages: Record<string, StageInfo>;
    systemAdministratorStages: Record<string, StageInfo>;
    devopsEngineerStages: Record<string, StageInfo>;
    databaseAdministratorStages: Record<string, StageInfo>;
    cyberSecurityStages: Record<string, StageInfo>;
    informationSecurityManagerStages: Record<string, StageInfo>;
    qaEngineerStages: Record<string, StageInfo>;
    softwareTesterStages: Record<string, StageInfo>;
    uiUxDesignerStages: Record<string, StageInfo>;
    webDesignerStages: Record<string, StageInfo>;
    gameDesignerStages: Record<string, StageInfo>;
    seoSpecialistStages: Record<string, StageInfo>;
    smmManagerStages: Record<string, StageInfo>;
    trafficManagerStages: Record<string, StageInfo>;
}

const typedStageData = stageData as StageData;

interface UseStageModalReturn {
    isModalOpen: boolean;
    selectedStage: StageInfo | null;
    gradientColor: string;
    openModal: (stageTitle: string, color: string) => void;
    closeModal: () => void;
}

export const useStageModal = (): UseStageModalReturn => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedStage, setSelectedStage] = useState<StageInfo | null>(null);
    const [gradientColor, setGradientColor] = useState<string>('#667eea');

    const openModal = (stageTitle: string, color: string): void => {
        // Ищем этап во всех категориях
        const stageData = 
            typedStageData.frontendStages?.[stageTitle] ||
            typedStageData.backendStages?.[stageTitle] ||
            typedStageData.fullstackStages?.[stageTitle] ||
            typedStageData.mobdevStages?.[stageTitle] ||
            typedStageData.gamedevStages?.[stageTitle] ||
            typedStageData.businessAnalystStages?.[stageTitle] ||
            typedStageData.dataAnalystStages?.[stageTitle] ||
            typedStageData.dataScientistStages?.[stageTitle] ||
            typedStageData.systemAnalystStages?.[stageTitle] ||
            typedStageData.projectManagerStages?.[stageTitle] ||
            typedStageData.productManagerStages?.[stageTitle] ||
            typedStageData.itRecruiterStages?.[stageTitle] ||
            typedStageData.systemAdministratorStages?.[stageTitle] ||
            typedStageData.devopsEngineerStages?.[stageTitle] ||
            typedStageData.databaseAdministratorStages?.[stageTitle] ||
            typedStageData.cyberSecurityStages?.[stageTitle] ||
            typedStageData.informationSecurityManagerStages?.[stageTitle] ||
            typedStageData.qaEngineerStages?.[stageTitle] ||
            typedStageData.softwareTesterStages?.[stageTitle] ||
            typedStageData.uiUxDesignerStages?.[stageTitle] ||
            typedStageData.webDesignerStages?.[stageTitle] ||
            typedStageData.gameDesignerStages?.[stageTitle] ||
            typedStageData.seoSpecialistStages?.[stageTitle] ||
            typedStageData.smmManagerStages?.[stageTitle] ||
            typedStageData.trafficManagerStages?.[stageTitle];
        
        if (stageData) {
            setSelectedStage(stageData);
            setGradientColor(color);
            setIsModalOpen(true);
        } else {
            console.log(`No data found for stage: ${stageTitle}`);
        }
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedStage(null), 300);
    };

    return {
        isModalOpen,
        selectedStage,
        gradientColor,
        openModal,
        closeModal
    };
};