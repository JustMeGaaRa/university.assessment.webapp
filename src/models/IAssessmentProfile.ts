import { IIndicator } from "./IIndicator";

export interface IAssessmentProfile {
    id: number;
    name: string;
    indicators: IIndicator[];
}
