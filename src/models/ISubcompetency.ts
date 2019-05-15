import { IIndicator } from "./IIndicator";

export interface ISubcompetency {
    subcompetencyId: number;
    name: string;
    competencyId?: number;
    competencyName?: string;
    indicators: IIndicator[];
}
