import { IIndicator } from "./IIndicator";

export interface ISubcompetency {
    subcompetencyId?: number;
    name: string;
    competencyId?: string;
    competencyName?: string;
    indicators: IIndicator[];
}
