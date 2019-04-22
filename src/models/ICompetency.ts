import { ISubcompetency } from "./ISubcompetency";

export interface ICompetency {
    id: number;
    name: string;
    subcompetencies: ISubcompetency[];
}
