import { IReportGroup } from "./IReportGroup";

export interface IReportData {
    competency: string;
    description: string;
    general: IReportGroup;
    groupped: IReportGroup;
}