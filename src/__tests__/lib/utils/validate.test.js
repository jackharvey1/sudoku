import { validateSudoku, isSolved } from '../../../lib/utils/validate';
import { sudoku, solvedSudoku } from '../../sudokus.json';

describe('validating a solved sudoku', () => {
    describe('validating', () => {
        it('validates a solved sudoku', () => {
            expect(validateSudoku(solvedSudoku)).toBe(true);
        });

        it('validates an unsolved sudoku', () => {
            expect(validateSudoku(sudoku)).toBe(true);
        });
    });

    describe('checking if solved', () => {
        it('returns true for a solved sudoku', () => {
            expect(isSolved(solvedSudoku)).toBe(true);
        });

        it('returns false for a unsolved sudoku', () => {
            expect(isSolved(sudoku)).toBe(false);
        });
    });
});
