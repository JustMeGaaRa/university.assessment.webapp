import { IQuestion } from "./IQuestion";

export interface IAnswer extends IQuestion {
    result: number;
}
