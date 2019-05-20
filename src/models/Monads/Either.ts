export type Either<T1, T2> =
    | { type: "choice1"; value: T1 }
    | { type: "choice2"; value: T2 }