const {
    getClueCount,
    getClueIndices,
    pickRandomClue,
    removeMirroredCluePair,
    mirrorCoordinates,
    shuffleArray,
    getSmallestClueSet,
    deepEquals,
    arrayExcludingElement
} = require('../../../lib/utils/array');
import { sudoku, solvedSudoku } from '../../sudokus.json';

expect.extend({
    toHaveMirroredCluesRemoved(received) {
        const clueCount = getClueCount(received);
        const twoWereRemoved = clueCount === 79;
        const centreWasRemoved = received[4][4] === '' && clueCount === 80;
        const pass = twoWereRemoved || centreWasRemoved;
        return {
            message: () => `expected array to have two clues or centre clue removed`,
            pass
        };
    },
    toBeRandom(fn) {
        const first = fn();
        const second = fn();
        const third = fn();
        const pass = first !== second || first !== third;
        return {
            message: () => `expected function to be random; got ${first}, ${second}, ${third}`,
            pass
        };
    }
});

describe('Array util functions', () => {
    it('counts the clues correct', () => {
        expect(getClueCount(sudoku)).toEqual(26);
    });

    it('gets clue indexes correctly', () => {
        expect(getClueIndices(sudoku)).toEqual([
            [0, 3], [0, 5],
            [1, 1], [1, 2], [1, 4], [1, 6], [1, 7],
            [4, 0], [4, 4], [4, 8],
            [5, 1], [5, 3], [5, 5], [5, 7],
            [6, 2], [6, 3], [6, 5], [6, 6],
            [7, 1], [7, 3], [7, 5], [7, 7],
            [8, 0], [8, 2], [8, 6], [8, 8]
        ]);
    });

    it('picks two clues which do not match, i.e. are random', () => {
        expect(() => pickRandomClue.bind(null, solvedSudoku)).toBeRandom('blah', 'bah2');
    });

    it('removes random clues', () => {
        const trimmedSudoku = removeMirroredCluePair(solvedSudoku);
        expect(trimmedSudoku).toHaveMirroredCluesRemoved();
    });

    describe('mirroring coordinates', () => {
        const cases = [
            {
                row: 5,
                column: 3,
                mirrorRow: 3,
                mirrorColumn: 5
            }, {
                row: 1,
                column: 2,
                mirrorRow: 7,
                mirrorColumn: 6
            }, {
                row: 1,
                column: 6,
                mirrorRow: 7,
                mirrorColumn: 2
            }
        ];

        cases.forEach(({ row, column, mirrorRow, mirrorColumn }) => {
            it(`mirrors row ${row} and column ${column} to ${mirrorRow} and ${mirrorColumn}`, () => {
                expect(mirrorCoordinates(row, column)).toEqual([mirrorRow, mirrorColumn]);
            });
        });
    });

    it('shuffles an array', () => {
        expect(
            shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
        ).not.toEqual(
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        );
    });

    it('keeps the same elements after shuffling', () => {
        expect(
            shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]).sort()
        ).toEqual(
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        );
    });

    it('keeps the same elements after shuffling', () => {
        expect(
            shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]).sort()
        ).toEqual(
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        );
    });

    it('finds the smallest subarray', () => {
        expect(getSmallestClueSet([
            [[2, 4, 5, 9], [2, 3, 4, 5, 8], [2, 3, 5, 8, 9], [], [3, 5, 6, 8, 9], [], [3, 5, 6, 8, 9], [2, 5, 6, 9], [2, 3, 8, 9]],
            [[5, 9], [], [], [8], [], [3, 5, 9], [], [], [3, 8, 9]],
            [[1, 2, 4, 5, 9], [2, 3, 4, 5, 8], [1, 2, 3, 5, 8, 9], [4, 6, 8], [3, 5, 6, 8, 9], [3, 5, 6, 9], [3, 5, 6, 8, 9], [2, 5, 6, 7, 9], [2, 3, 7, 8, 9]],
            [[1, 2, 4, 5, 6, 7], [2, 4, 5, 7, 8], [1, 2, 5, 8], [6, 7, 8], [1, 5, 6, 7, 8, 9], [1, 5, 6, 9], [3, 4, 5, 9], [1, 2, 5, 7, 9], [1, 2, 3, 4, 7, 9]],
            [[], [2, 5, 7, 8], [1, 2, 5, 8], [7, 8], [], [1, 5, 9], [5, 9], [1, 2, 5, 7, 9], []],
            [[1, 4, 5, 6, 7], [], [1, 5], [], [1, 5, 6, 7], [], [4, 5], [], [1, 4, 7]],
            [[7, 9], [3, 7], [], [], [1, 3, 7], [], [], [1, 9], [1, 8, 9]],
            [[2, 5, 7], [], [2, 5], [], [6, 7], [], [4, 6], [], [4]],
            [[], [2, 3], [], [2, 6], [1, 3, 6], [1, 3, 6], [], [1, 6, 9], []]
        ])).toEqual([1, 0]);
    });

    describe('deep equals', () => {
        it('returns true for equivalent arrays one levels deep', () => {
            expect(deepEquals([1], [1])).toBe(true);
        });

        it('returns true for equivalent arrays two levels deep', () => {
            expect(
                deepEquals(
                    [1, [2, 9, 5], [3]],
                    [1, [2, 9, 5], [3]]
                )).toBe(true);
        });

        it('returns false for non-equivalent arrays one levels deep', () => {
            expect(deepEquals([1], [2])).toBe(false);
        });

        it('returns false for non-equivalent arrays two levels deep', () => {
            expect(
                deepEquals(
                    [[1], [3, 9, 8], 1, [2]],
                    [[1], [3, 7, 5], 6]
                )).toBe(false);
        });

        it('returns false when arrays are not in the same position', () => {
            expect(deepEquals([[1]], [1])).toBe(false);
        });
    });

    it('excludes an element correctly', () => {
        expect(arrayExcludingElement([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 4, 5]);
    });
});
