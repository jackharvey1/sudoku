import { generatePuzzle, generateFilledGrid } from '../../public/js/generator';
import { getClueCount } from '../../public/js/utils/array';
import { type Grid } from '../../public/js/types';

describe('Generating a sudoku', () => {
    it('generates a puzzle with a reasonable amount of clues removed', () => {
        const { sudoku } = generatePuzzle();
        expect(getClueCount(sudoku as Grid)).toBeLessThan(60);
    });

    it('produces a valid starting grid', () => {
        const grid = generateFilledGrid() as Grid;
        const rowSums = grid.map(row => row.reduce((sum, value) => (sum as number) + (value as number)));
        expect(rowSums).toEqual([
            45, 45, 45, 45, 45, 45, 45, 45, 45
        ]);
    });

    it('produces differing starting grids', () => {
        const firstGrid = generateFilledGrid();
        const secondGrid = generateFilledGrid();
        expect(firstGrid).not.toEqual(secondGrid);
    });
});
