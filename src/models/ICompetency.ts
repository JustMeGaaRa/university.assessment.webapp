import { ISubcompetency } from "./ISubcompetency";

export interface ICompetency {
    competencyId: number;
    name: string;
    date: Date;
    description: string;
    subcompetencies: ISubcompetency[];
}
