import { type Grid } from '../types';
import {
    circularPositionMap,
    circularTransform,
    getColumn
} from './transform';

function getPossibles (sudokuAsRows: Grid, row: number, column: number) {
    const possibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const relatedCells = getRelatedCells(sudokuAsRows, row, column);
    return possibles.filter(possible => !relatedCells.includes(possible));
}

function getRelatedCells (sudokuAsRows: Grid, row: number, column: number) {
    const { major: box } = circularPositionMap(row, column);
    const boxValues = circularTransform(sudokuAsRows)[box].filter(Boolean);
    const rowValues = sudokuAsRows[row].filter(Boolean);
    const columnValues = getColumn(sudokuAsRows, column).filter(Boolean);
    return [...boxValues, ...rowValues, ...columnValues];
}

export {
    getPossibles,
    getRelatedCells
};
