import { IQuestion } from "./IQuestion";

export interface IAssessmentProfile {
    name: string;
    indicators: IQuestion[];
}
