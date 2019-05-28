import { IReportRecord } from "./IReportRecord";

export interface IReportGroup {
    title: string;
    description: string;
    data: IReportRecord[];
}