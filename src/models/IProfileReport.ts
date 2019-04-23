import { IReportData } from "./IReportData";

export interface IProfileReport {
    username: string;
    fullname: string;
    description: string,
    date: Date;
    summary: IReportData;
    data: IReportData[];
}