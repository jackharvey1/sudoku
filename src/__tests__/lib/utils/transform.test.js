import {
    circularTransform,
    getColumn,
    circularPositionMap
} from '../../../lib/utils/transform';
import { solvedSudoku, solvedSudokuTransformed } from '../../sudokus.json';

describe('Performing transforms', () => {
    it('transforms to rows', () => {
        expect(circularTransform(solvedSudokuTransformed)).toEqual(solvedSudoku);
    });

    it('transforms to boxes', () => {
        expect(circularTransform(solvedSudoku)).toEqual(solvedSudokuTransformed);
    });

    it('gets the column correctly', () => {
        expect(getColumn(solvedSudoku, 3)).toEqual([1, 8, 4, 6, 7, 3, 5, 9, 2]);
    });

    describe('Getting box position', () => {
        const cases = [{
            row: 1,
            column: 2,
            box: 0,
            cell: 5
        }, {
            row: 7,
            column: 0,
            box: 6,
            cell: 3
        }, {
            row: 8,
            column: 7,
            box: 8,
            cell: 7
        }, {
            row: 5,
            column: 4,
            box: 4,
            cell: 7
        }];

        cases.forEach(({ row, column, box, cell }) => {
            it(`maps row ${row} and column ${column} to box ${box} and cell ${cell}`, () => {
                expect(circularPositionMap(row, column)).toEqual({
                    major: box,
                    minor: cell
                });
            });
        });

        cases.forEach(({ row, column, box, cell }) => {
            it(`maps box ${box} and cell ${cell} to row ${row} and column ${column}`, () => {
                expect(circularPositionMap(box, cell)).toEqual({
                    major: row,
                    minor: column
                });
            });
        });
    });
});
