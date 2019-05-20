export interface IMapFunction<TInput, TOutput> {
    (value: TInput): TOutput;
}