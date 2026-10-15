import { type Coordinate, type Grid, type PossiblesMap, type SolveResult } from './types';
import { circularPositionMap, circularTransform, getColumn } from './utils/transform';
import { getPossibles } from './utils/possibles';
import { arrayExcludingElement, getSmallestClueSet, deepClone } from './utils/array';
import { validateSudoku, isSolved } from './utils/validate';

function solve (sudokuAsRows: Grid, difficultyTarget = 600): SolveResult {
    const stack = [sudokuAsRows];
    let branchingDifficulty = 0;

    while (stack.length) {
        const currentNode = stack[stack.length - 1];
        stack.pop();

        if (isSolved(currentNode)) {
            return {
                branchingDifficulty: branchingDifficulty,
                sudoku: currentNode
            };
        }

        const possiblesMap = getPossiblesMap(currentNode);

        const hasNoNakedSingles = !hasNakedSingle(possiblesMap);
        const isValid = validateSudoku(currentNode);

        if (branchingDifficulty > difficultyTarget) {
            return {
                branchingDifficulty: Infinity,
                sudoku: null
            };
        }

        if (hasNoNakedSingles) {
            const smallestClueSet = getSmallestClueSet(possiblesMap);
            if (isValid && smallestClueSet) {
                branchingDifficulty += 100;
                pushPossiblesOntoStack(stack, currentNode, possiblesMap, smallestClueSet);
            }
        } else {
            const nextNode = flattenNakedSingles(currentNode, possiblesMap);
            stack.push(nextNode);
        }
    }

    throw new Error('Sudoku has no solution');
}

const flattenNakedSingles = (currentNode: Grid, possiblesMap: PossiblesMap) =>
    currentNode.map((row, i) =>
        row.map((item, j) =>
            possiblesMap[i][j].length === 1 && item === null
                ? possiblesMap[i][j][0]
                : item
        )
    );

function pushPossiblesOntoStack (
    stack: Grid[],
    currentNode: Grid,
    possiblesMap: PossiblesMap,
    [row, column]: Coordinate
) {
    possiblesMap[row][column].forEach(possible => {
        const nextNode = deepClone(currentNode);
        nextNode[row][column] = possible;
        stack.push(nextNode);
    });
}

const hasNakedSingle = (possiblesMap: PossiblesMap) =>
    possiblesMap.some(possiblesRow =>
        possiblesRow.some(cellPossibles => cellPossibles.length === 1)
    );

function restrictionBasedOnRange (possibles: PossiblesMap, rowNumber: number, columnNumber: number) {
    const { major: boxNumber } = circularPositionMap(rowNumber, columnNumber);
    const possiblesInBox = circularTransform(possibles)[boxNumber];
    const possiblesOnRow = possibles[rowNumber];
    const possiblesOnColumn = getColumn(possibles, columnNumber);
    const relevantPossibles = possiblesOnRow[columnNumber];

    for (let j = 0; j < relevantPossibles.length; j++) {
        const { minor: square } = circularPositionMap(rowNumber, columnNumber);
        const boxExcludingThisElement = arrayExcludingElement(possiblesInBox, square).join();
        const columnExcludingThisElement = arrayExcludingElement(possiblesOnColumn, rowNumber).join();
        const rowExcludingThisElement = arrayExcludingElement(possiblesOnRow, columnNumber).join();

        const candidate = String(relevantPossibles[j]);
        const isOnlyPossibleInBox = !boxExcludingThisElement.includes(candidate);
        const isOnlyPossibleOnRow = !rowExcludingThisElement.includes(candidate);
        const isOnlyPossibleOnColumn = !columnExcludingThisElement.includes(candidate);

        if (isOnlyPossibleOnRow || isOnlyPossibleOnColumn || isOnlyPossibleInBox) {
            return [relevantPossibles[j]];
        }
    }

    return relevantPossibles;
}

const getPossiblesMap = (sudokuAsRows: Grid) =>
    sudokuAsRows
        .map((rowValues, row) =>
            rowValues.map((item, column) =>
                item === null
                    ? getPossibles(sudokuAsRows, row, column)
                    : []
            )
        )
        .map((rowOfPossibles, row, possiblesMap) =>
            rowOfPossibles.map((cellPossibles, cell) =>
                restrictionBasedOnRange(possiblesMap, row, cell)
            )
        );

export {
    solve,
    restrictionBasedOnRange,
    getPossiblesMap
};
