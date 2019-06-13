import { IUser } from "../IUser";
import { IAssessmentResult } from "./IAssessmentResult";

export interface IAssessment {
    id: number;
    targetUser: IUser;
    accessUsers: IUser[];
    availableFromDate: Date;
    availableToDate: Date;
    assessmentProfile: string;
    results: IAssessmentResult[];
}