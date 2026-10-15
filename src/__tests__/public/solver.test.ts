import {
    solve,
    restrictionBasedOnRange,
    getPossiblesMap
} from '../../public/js/solver';
import { isSolved } from '../../public/js/utils/validate';
import { emptySudoku, sudoku, solvedSudoku, trickySudoku } from '../sudokus';
import { deepClone } from '../../public/js/utils/array';

const restrictedPossiblesMap = [
    [[2, 4, 5, 9], [2, 3, 4, 5, 8], [2, 3, 5, 8, 9], [], [3, 5, 6, 8, 9], [], [3, 5, 6, 8, 9], [2, 5, 6, 9], [2, 3, 8, 9]],
    [[5, 9], [], [], [8], [], [3, 5, 9], [], [], [3, 8, 9]],
    [[1, 2, 4, 5, 9], [2, 3, 4, 5, 8], [1, 2, 3, 5, 8, 9], [4], [3, 5, 6, 8, 9], [3, 5, 6, 9], [3, 5, 6, 8, 9], [2, 5, 6, 7, 9], [2, 3, 7, 8, 9]],
    [[1, 2, 4, 5, 6, 7], [2, 4, 5, 7, 8], [1, 2, 5, 8], [6, 7, 8], [1, 5, 6, 7, 8, 9], [1, 5, 6, 9], [3, 4, 5, 9], [1, 2, 5, 7, 9], [1, 2, 3, 4, 7, 9]],
    [[], [2, 5, 7, 8], [1, 2, 5, 8], [7, 8], [], [1, 5, 9], [5, 9], [1, 2, 5, 7, 9], []],
    [[1, 4, 5, 6, 7], [], [1, 5], [], [1, 5, 6, 7], [], [4, 5], [], [1, 4, 7]],
    [[9], [3, 7], [], [], [1, 3, 7], [], [], [1, 9], [8]],
    [[2, 5, 7], [], [2, 5], [], [6, 7], [], [4, 6], [], [4]],
    [[], [2, 3], [], [2], [1, 3, 6], [1, 3, 6], [], [9], []]
];

const possiblesMap = [
    [[2, 4, 5, 9], [2, 3, 4, 5, 8], [2, 3, 5, 8, 9], [], [3, 5, 6, 8, 9], [], [3, 5, 6, 8, 9], [2, 5, 6, 9], [2, 3, 8, 9]],
    [[5, 9], [], [], [8], [], [3, 5, 9], [], [], [3, 8, 9]],
    [[1, 2, 4, 5, 9], [2, 3, 4, 5, 8], [1, 2, 3, 5, 8, 9], [4, 6, 8], [3, 5, 6, 8, 9], [3, 5, 6, 9], [3, 5, 6, 8, 9], [2, 5, 6, 7, 9], [2, 3, 7, 8, 9]],
    [[1, 2, 4, 5, 6, 7], [2, 4, 5, 7, 8], [1, 2, 5, 8], [6, 7, 8], [1, 5, 6, 7, 8, 9], [1, 5, 6, 9], [3, 4, 5, 9], [1, 2, 5, 7, 9], [1, 2, 3, 4, 7, 9]],
    [[], [2, 5, 7, 8], [1, 2, 5, 8], [7, 8], [], [1, 5, 9], [5, 9], [1, 2, 5, 7, 9], []],
    [[1, 4, 5, 6, 7], [], [1, 5], [], [1, 5, 6, 7], [], [4, 5], [], [1, 4, 7]],
    [[7, 9], [3, 7], [], [], [1, 3, 7], [], [], [1, 9], [1, 8, 9]],
    [[2, 5, 7], [], [2, 5], [], [6, 7], [], [4, 6], [], [4]],
    [[], [2, 3], [], [2, 6], [1, 3, 6], [1, 3, 6], [], [1, 6, 9], []]
];

describe('When solving sudoku', () => {
    it('generates a restricted possibility map', () => {
        expect(getPossiblesMap(sudoku)).toEqual(restrictedPossiblesMap);
    });

    it('eliminates all other possibles in a cell due to 1-9 restriction on a row', () => {
        expect(restrictionBasedOnRange(possiblesMap, 6, 8)).toEqual([8]);
    });

    it('eliminates all other possibles in a cell due to 1-9 restriction on a column', () => {
        expect(restrictionBasedOnRange(possiblesMap, 2, 3)).toEqual([4]);
    });

    it('eliminates all other possibles in a cell due to 1-9 restriction in a box', () => {
        expect(restrictionBasedOnRange(possiblesMap, 6, 0)).toEqual([9]);
    });

    it('solves a sudoku requiring no backtracking', () => {
        expect(solve(sudoku)).toHaveProperty('sudoku', solvedSudoku);
    });

    it('solves a sudoku requiring backtracking', () => {
        const { sudoku: solution } = solve(trickySudoku, 2000);
        expect(solution && isSolved(solution)).toBe(true);
    });

    it('gives up once the difficulty target is exceeded', () => {
        expect(solve(trickySudoku, 0)).toEqual({ branchingDifficulty: Infinity, sudoku: null });
    });

    it('throws when the sudoku has no solution', () => {
        const unsolvable = deepClone(emptySudoku);
        unsolvable[0][0] = 1;
        unsolvable[0][1] = 1;
        expect(() => solve(unsolvable)).toThrow('Sudoku has no solution');
    });
});
