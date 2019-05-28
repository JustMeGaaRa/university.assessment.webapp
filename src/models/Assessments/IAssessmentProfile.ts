import { ICompetency } from "../Competencies/ICompetency";

export interface IAssessmentProfile {
    id?: number;
    name: string;
    creationDate: Date;
    competencies: ICompetency[];
}