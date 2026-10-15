import { type Grid } from '../types';
import { circularTransform, getColumn } from './transform';

function validateSudoku (sudoku: Grid) {
    const rowsValid = sudoku.every(row =>
        row
            .every((cell, i) =>
                cell === '' || row.lastIndexOf(cell) === i
            )
    );
    const columnsValid = sudoku.every((row, i) =>
        getColumn(sudoku, i)
            .every((cell, columnIndex, column) =>
                cell === '' || column.lastIndexOf(cell) === columnIndex
            )
    );
    const boxesValid = circularTransform(sudoku).every(box =>
        box
            .every((cell, i) =>
                cell === '' || box.lastIndexOf(cell) === i
            )
    );
    return rowsValid && columnsValid && boxesValid;
}

function isSolved (sudoku: Grid) {
    const rowsSolved = sudoku.every(row =>
        row.reduce((sum, value) => (sum as number) + (value as number)) === 45
    );
    const columnsSolved = sudoku.every((row, i) =>
        getColumn(sudoku, i).reduce((sum, value) => (sum as number) + (value as number)) === 45
    );
    const boxesSolved = circularTransform(sudoku).every(box =>
        box.reduce((sum, value) => (sum as number) + (value as number)) === 45
    );
    return validateSudoku(sudoku) && rowsSolved && columnsSolved && boxesSolved;
}

export {
    validateSudoku,
    isSolved
};
