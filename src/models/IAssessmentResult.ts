import { IAnswer } from "./IAnswer";

export interface IAssessmentResult {
    username: string;
    fullname: string;
    date: Date;
    answers: IAnswer[];
}
