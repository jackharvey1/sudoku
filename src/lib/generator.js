import { circularTransform, circularPositionMap } from './utils/transform';
import { getPossibles } from './utils/possibles';
import {
    shuffleArray,
    getClueCount,
    removeMirroredCluePair
} from './utils/array';
import { solve } from './solver';

// https://www.technologyreview.com/s/426554/mathematicians-solve-minimum-sudoku-problem
const mcGuireLimit = 17;

function generatePuzzle (sudoku = generateFilledGrid(), branchingDifficulty) {
    const clueCount = getClueCount(sudoku);
    const nextSudoku = removeMirroredCluePair(sudoku);

    const solution = solve(nextSudoku);

    return solution.sudoku && (clueCount - 2) > mcGuireLimit
        ? generatePuzzle(nextSudoku, solution.branchingDifficulty)
        : {
            sudoku: circularTransform(sudoku),
            difficulty: branchingDifficulty + (81 - clueCount)
        };
}

function generateFilledGrid () {
    const initialSudoku = createEmptySudoku();
    const stack = [initialSudoku];
    while (stack.length) {
        const sudokuNode = stack[stack.length - 1];
        stack.pop();

        const isComplete = !sudokuNode.some(row =>
            row.some(item => item === '')
        );

        if (isComplete) {
            return circularTransform(sudokuNode);
        }

        const boxNumber = sudokuNode.findIndex(row => row.some(item => item === ''));
        const cellNumber = sudokuNode[boxNumber].findIndex(item => item === '');

        const { major: row, minor: column } = circularPositionMap(boxNumber, cellNumber);
        const candidates = shuffleArray(getPossibles(circularTransform(sudokuNode), row, column));

        if (boxNumber < 9 && cellNumber < 9 && candidates.length) {
            candidates.forEach(candidate => {
                const nextSudokuNode = JSON.parse(JSON.stringify(sudokuNode));
                nextSudokuNode[boxNumber][cellNumber] = candidate;
                stack.push(nextSudokuNode);
            });
        }
    }
}

function createEmptySudoku () {
    return Array(9)
        .fill('')
        .map(() =>
            Array(9)
                .fill('')
                .map(() => '')
        );
}

export {
    generatePuzzle,
    generateFilledGrid
};
