import { IMapFunction } from "./IMapFunction";

export type Maybe<TResult> =
    | { type: "just"; value: TResult }
    | { type: "nothing" }

export namespace Maybe {
    export function lift<TInput>(value: TInput): Maybe<TInput> {
        return value
            ? { type: "just", value: value }
            : { type: "nothing" };
    }

    export function map<TInput, TOutput>(value: Maybe<TInput>, func: IMapFunction<TInput, TOutput>): Maybe<TOutput> {
        switch (value.type) {
            case "just":
                return { type: "just", value: func(value.value) }
            case "nothing":
                return { type: "nothing" }
        }
    }
}