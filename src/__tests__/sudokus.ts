import fixtures from './sudokus.json';
import { type Grid } from '../public/js/types';

export const {
    emptySudoku,
    sudoku,
    trickySudoku,
    solvedSudoku,
    solvedSudokuTransformed
} = fixtures as Record<keyof typeof fixtures, Grid>;
