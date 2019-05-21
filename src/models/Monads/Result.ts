import { IMapFunction } from "./IMapFunction";

export type Result<TResult, TError> =
    | { type: "success"; value: TResult }
    | { type: "error"; error: TError; message?: string }

export namespace Result {
    export function ofResult<TResult, TError>(value: TResult): Result<TResult, TError> {
        return { type: "success", value: value };
    }

    export function ofError<TResult, TError>(error: TError, message?: string): Result<TResult, TError> {
        return { type: "error", error: error, message: message };
    }

    export function map<TInput, TError, TOutput>(value: Result<TInput, TError>, func: IMapFunction<TInput, TOutput>): Result<TOutput, TError> {
        switch (value.type) {
            case "success":
                return { type: "success", value: func(value.value) }
            case "error":
                return { type: "error", error: value.error, message: value.message }
        }
    }

    export function match<TResult, TError>(
        result: Result<TResult, TError>,
        onSuccess: (value: TResult) => void,
        onError: (error: TError) => void) {
        switch (result.type) {
            case "success":
                onSuccess(result.value);
                break;
            case "error":
                onError(result.error);
                break;
        }
    }
}