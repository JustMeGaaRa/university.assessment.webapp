import { IAnswer } from "./IAnswer";

export interface IAssessment {
    assessmentId: number;
    username: string;
    fullname: string;
    avatarUrl: string;
    respondent: string;
    respondentType: RespondentType;
    availableFromDate: Date;
    availableToDate: Date;
    passedOnDate?: Date;
    description: string;
    assessmentProfile: string;
    answers: IAnswer[];
}

export enum RespondentType {
    Self = "personal",
    Supervisor = "supervisor",
    Colleague = "colleague",
    Subordinate = "subordinate",
    Client = "client"
}