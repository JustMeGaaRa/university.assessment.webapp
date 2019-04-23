import { IIndicator } from "./IIndicator";

export interface ISubcompetency {
    id: number;
    competencyId: number;
    name: string;
    indicators: IIndicator[];
}
