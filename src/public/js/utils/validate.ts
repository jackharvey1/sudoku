import { type Cell, type Grid } from '../types';
import { circularTransform, getColumn } from './transform';

function validateSudoku (sudoku: Grid) {
    const rowsValid = sudoku.every(row =>
        row
            .every((cell, i) =>
                cell === null || row.lastIndexOf(cell) === i
            )
    );
    const columnsValid = sudoku.every((row, i) =>
        getColumn(sudoku, i)
            .every((cell, columnIndex, column) =>
                cell === null || column.lastIndexOf(cell) === columnIndex
            )
    );
    const boxesValid = circularTransform(sudoku).every(box =>
        box
            .every((cell, i) =>
                cell === null || box.lastIndexOf(cell) === i
            )
    );
    return rowsValid && columnsValid && boxesValid;
}

function isSolved (sudoku: Grid) {
    const rowsSolved = sudoku.every(row =>
        sum(row) === 45
    );
    const columnsSolved = sudoku.every((row, i) =>
        sum(getColumn(sudoku, i)) === 45
    );
    const boxesSolved = circularTransform(sudoku).every(box =>
        sum(box) === 45
    );
    return validateSudoku(sudoku) && rowsSolved && columnsSolved && boxesSolved;
}

function sum (cells: Cell[]) {
    return cells.reduce((total: number, cell) => total + Number(cell), 0);
}

export {
    validateSudoku,
    isSolved
};
