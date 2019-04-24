import { ISubcompetency } from "./ISubcompetency";

export interface ICompetency {
    id: number;
    name: string;
    date: Date;
    description: string;
    subcompetencies: ISubcompetency[];
}
