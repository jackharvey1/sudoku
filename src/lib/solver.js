import { circularPositionMap, circularTransform, getColumn } from './utils/transform';
import { getPossibles } from './utils/possibles';
import { arrayExcludingElement, getSmallestClueSet, deepClone } from './utils/array';
import { validateSudoku, isSolved } from './utils/validate';

function solve (sudokuAsRows, difficultyTarget = 600) {
    const stack = [sudokuAsRows];
    let branchingDifficulty = 0;

    while (stack.length) {
        const sudokuNode = stack[stack.length - 1];
        stack.pop();

        if (isSolved(sudokuNode)) {
            return {
                branchingDifficulty: branchingDifficulty,
                sudoku: sudokuNode
            };
        }

        const possiblesMap = getRestrictedPossiblesMap(sudokuNode);

        const requiresBacktracking = !possiblesMap.some(possiblesRow =>
            possiblesRow.some(cellPossibles => cellPossibles.length === 1)
        );

        if (branchingDifficulty > difficultyTarget) {
            return {
                sudoku: null,
                difficulty: Infinity
            };
        }

        if (requiresBacktracking) {
            if (validateSudoku(sudokuNode)) {
                const [row, column] = getSmallestClueSet(possiblesMap);
                branchingDifficulty += possiblesMap[row][column].length * 100;

                possiblesMap[row][column].forEach(possible => {
                    const nextNode = deepClone(sudokuNode);
                    nextNode[row][column] = possible;
                    stack.push(nextNode);
                });
            }
        } else {
            const nextNode = sudokuNode.map((row, i) =>
                row.map((item, j) =>
                    possiblesMap[i][j].length === 1 && item === ''
                        ? possiblesMap[i][j][0]
                        : item
                )
            );
            stack.push(nextNode);
        }
    }
}

function restrictionBasedOnRange (possibles, rowNumber, columnNumber) {
    const { major: boxNumber } = circularPositionMap(rowNumber, columnNumber);
    const possiblesInBox = circularTransform(possibles)[boxNumber];
    const possiblesOnRow = possibles[rowNumber];
    const possiblesOnColumn = getColumn(possibles, columnNumber);
    const relevantPossibles = possiblesOnRow[columnNumber];

    for (let j = 0; j < relevantPossibles.length; j++) {
        const mappedPos = (((rowNumber % 3) * 3) + (columnNumber % 3));
        const boxExcludingThisElement = arrayExcludingElement(possiblesInBox, mappedPos);
        const columnExcludingThisElement = arrayExcludingElement(possiblesOnColumn, rowNumber);
        const rowExcludingThisElement = arrayExcludingElement(possiblesOnRow, columnNumber);

        const isOnlyPossibleInBox = !boxExcludingThisElement.some(possiblesCell =>
            possiblesCell.includes(relevantPossibles[j])
        );

        const isOnlyPossibleOnRow = !rowExcludingThisElement.some(possiblesCell =>
            possiblesCell.includes(relevantPossibles[j])
        );

        const isOnlyPossibleOnColumn = !columnExcludingThisElement.some(possiblesCell =>
            possiblesCell.includes(relevantPossibles[j])
        );

        if (isOnlyPossibleOnRow || isOnlyPossibleOnColumn || isOnlyPossibleInBox) {
            return [relevantPossibles[j]];
        }
    }

    return relevantPossibles;
}

function getRestrictedPossiblesMap (sudokuAsRows) {
    return getPossiblesMap(sudokuAsRows)
        .map((rowOfPossibles, row, possiblesMap) =>
            rowOfPossibles.map((cellPossibles, cell) =>
                restrictionBasedOnRange(possiblesMap, row, cell)
            )
        );
}

function getPossiblesMap (sudokuAsRows) {
    return sudokuAsRows
        .map((rowValues, row) =>
            rowValues.map((item, column) =>
                item === ''
                    ? getPossibles(sudokuAsRows, row, column)
                    : []
            )
        );
}

export {
    solve,
    restrictionBasedOnRange,
    getRestrictedPossiblesMap,
    getPossiblesMap
};
