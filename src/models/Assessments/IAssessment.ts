import { IUser } from "../IUser";

export interface IAssessment {
    id: number;
    targetUser: IUser;
    accessUsers: IUser[];
    availableFromDate: Date;
    availableToDate: Date;
    assessmentProfile: string;
}