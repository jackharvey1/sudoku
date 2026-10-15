export type Cell = number | null;

export type Grid = Cell[][];

export type Coordinate = [number, number];

export type PossiblesMap = number[][][];

export type SolveSuccess = {
    branchingDifficulty: number;
    sudoku: Grid;
};

export type SolveFailure = {
    branchingDifficulty: number;
    sudoku: null;
};

export type SolveResult = SolveSuccess | SolveFailure;

export type Puzzle = {
    solution: Grid;
    sudoku: Grid;
    difficulty: number;
};
