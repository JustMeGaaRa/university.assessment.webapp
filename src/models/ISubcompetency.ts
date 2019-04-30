import { IIndicator } from "./IIndicator";

export interface ISubcompetency {
    subcompetencyId: number;
    competencyId: number;
    name: string;
    indicators: IIndicator[];
}
