import { generatePuzzle, generateFilledGrid } from '../../public/js/generator';
import { getClueCount } from '../../public/js/utils/array';

describe('Generating a sudoku', () => {
    it('generates a puzzle with a reasonable amount of clues removed', () => {
        const { sudoku } = generatePuzzle();
        expect(getClueCount(sudoku)).toBeLessThan(60);
    });

    it('produces a valid starting grid', () => {
        const grid = generateFilledGrid();
        const rowSums = grid.map(row => row.reduce((sum, cell) => sum + cell));
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
