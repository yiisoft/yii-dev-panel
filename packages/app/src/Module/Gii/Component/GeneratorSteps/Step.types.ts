import { GiiGenerator } from "@yii-dev-panel/app/Module/Gii/API/Gii";

export type StepProps = {
    generator: GiiGenerator;
    onComplete: () => void;
};
