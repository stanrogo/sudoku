
enum PuzzleType {
    custom,
    preset,
}

interface Option {
    name: string;
    puzzle: number[][];
    solution: number[][];
    type: PuzzleType;
}

interface Result {
    row: number;
    col: number;
    num: number;
}

export { PuzzleType, Option, Result };
