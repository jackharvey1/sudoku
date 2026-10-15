import { type Cell, type Grid, type Puzzle } from './types';
import { circularTransform, circularPositionMap } from './utils/transform';
import { getPossibles } from './utils/possibles';
import {
    shuffleArray,
    getClueCount,
    removeMirroredCluePair,
    deepClone
} from './utils/array';
import { solve } from './solver';

// https://www.technologyreview.com/s/426554/mathematicians-solve-minimum-sudoku-problem
const mcGuireLimit = 17;

function generatePuzzle (): Puzzle {
    const filledGrid = generateFilledGrid();
    return removeClues(filledGrid, filledGrid, 0);
}

function removeClues (sudoku: Grid, solution: Grid, branchingDifficulty: number): Puzzle {
    const clueCount = getClueCount(sudoku);
    const nextSudoku = removeMirroredCluePair(sudoku);

    const nextSolution = solve(nextSudoku);

    return nextSolution.sudoku && (clueCount - 2) > mcGuireLimit
        ? removeClues(nextSudoku, nextSolution.sudoku, nextSolution.branchingDifficulty)
        : {
            solution: circularTransform(solution),
            sudoku: circularTransform(sudoku),
            difficulty: branchingDifficulty + (81 - clueCount)
        };
}

function generateFilledGrid (): Grid {
    const emptySudoku: Grid = Array.from({ length: 9 }, () => Array<Cell>(9).fill(null));
    const stack = [emptySudoku];
    while (stack.length) {
        const sudokuNode = stack[stack.length - 1];
        stack.pop();

        const isComplete = !sudokuNode.some(row =>
            row.some(item => item === null)
        );

        if (isComplete) {
            return circularTransform(sudokuNode);
        }

        const boxNumber = sudokuNode.findIndex(row => row.some(item => item === null));
        const cellNumber = sudokuNode[boxNumber].findIndex(item => item === null);

        const { major: row, minor: column } = circularPositionMap(boxNumber, cellNumber);
        const candidates = shuffleArray(getPossibles(circularTransform(sudokuNode), row, column));

        if (boxNumber < 9 && cellNumber < 9 && candidates.length) {
            candidates.forEach(candidate => {
                const nextSudokuNode = deepClone(sudokuNode);
                nextSudokuNode[boxNumber][cellNumber] = candidate;
                stack.push(nextSudokuNode);
            });
        }
    }

    // Backtracking from an empty grid always finds a filled one.
    /* v8 ignore next -- @preserve */
    throw new Error('Could not fill a grid');
}

export {
    generatePuzzle,
    generateFilledGrid
};
