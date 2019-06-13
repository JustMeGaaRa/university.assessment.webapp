import { IAnswer } from "./IAnswer";
import { IUser } from "../IUser";

export interface IAssessmentResult {
    id: number;
    targetUser: IUser;
    respondent: IUser;
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