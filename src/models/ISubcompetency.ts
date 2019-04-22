import { IIndicator } from "./IIndicator";

export interface ISubcompetency {
    id: number;
    name: string;
    indicators: IIndicator[];
}
