import { IAnswer } from "./IAnswer";

export interface IAssessment {
    assessmentId: number;
    username: string;
    fullname: string;
    avatarUrl: string;
    availableFromDate: Date;
    availableToDate: Date;
    passedOnDate?: Date;
    description: string;
    assessmentProfile: string;
    answers: IAnswer[];
}
