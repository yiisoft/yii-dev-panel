import {GiiGenerator} from "../../API/Gii";

export type StepProps = {
    generator: GiiGenerator;
    onComplete: () => void;
}