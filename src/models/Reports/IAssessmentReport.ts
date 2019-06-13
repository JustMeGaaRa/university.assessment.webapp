import { IReportData } from "./IReportData";

export interface IAssessmentReport {
    username: string;
    fullname: string;
    description: string,
    date: Date;
    summary: IReportData;
    data: IReportData[];
}