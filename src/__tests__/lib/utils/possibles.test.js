import { getPossibles, getRelatedCells } from '../../../lib/utils/possibles';
import { sudoku } from '../../sudokus.json';

describe('Working with possibles', () => {
    it('it returns possibilities for a position', () => {
        expect(getPossibles(sudoku, 1, 2)).toEqual([3, 5, 8, 9]);
    });

    it('gets all related cells', () => {
        expect(getRelatedCells(sudoku, 4, 3))
            .toEqual([4, 3, 2, 3, 4, 6, 1, 3, 5, 9]);
    });
});
