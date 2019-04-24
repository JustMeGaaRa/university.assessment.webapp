import { IQuestion } from "./IQuestion";

export interface IAssessmentProfile {
    id: number;
    name: string;
    questions: IQuestion[];
}