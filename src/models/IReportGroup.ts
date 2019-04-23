import { IReportRecord } from "../models/IReportRecord";

export interface IReportGroup {
    title: string;
    description: string;
    data: IReportRecord[];
}