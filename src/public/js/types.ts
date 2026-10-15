export type Cell = number | string;

export type Grid = Cell[][];

export type Coordinate = [number, number];

export type PossiblesMap = number[][][];

export type SolveSuccess = {
    branchingDifficulty: number;
    sudoku: Grid;
};

export type SolveFailure = {
    sudoku: null;
    difficulty: number;
};

export type SolveResult = SolveSuccess | SolveFailure;

export type Puzzle = {
    solution: Grid | null;
    sudoku: Grid | null;
    difficulty: number | null;
};
