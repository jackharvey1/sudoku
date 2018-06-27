import { circularPositionMap, circularTransform, getColumn } from './utils/transform';
import { getPossibles } from './utils/possibles';
import { getClueCount, arrayExcludingElement, getSmallestClueSet, deepClone } from './utils/array';
import { validateSudoku, isSolved } from './utils/validate';

function solve (sudokuAsRows, difficultyTarget = 600) {
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

        const possiblesMap = getRestrictedPossiblesMap(currentNode);

        const hasNoNakedSingles = !hasNakedSingle(possiblesMap);
        const hasPossibles = getClueCount(possiblesMap) > 0;
        const isValid = validateSudoku(currentNode);

        if (branchingDifficulty > difficultyTarget) {
            return {
                sudoku: null,
                difficulty: Infinity
            };
        }

        if (hasNoNakedSingles) {
            if (isValid && hasPossibles) {
                branchingDifficulty += 100;
                pushPossiblesOntoStack(stack, currentNode, possiblesMap);
            }
        } else {
            const nextNode = flattenNakedSingles(currentNode, possiblesMap);
            stack.push(nextNode);
        }
    }
}

function flattenNakedSingles (currentNode, possiblesMap) {
    return currentNode.map((row, i) =>
        row.map((item, j) =>
            possiblesMap[i][j].length === 1 && item === ''
                ? possiblesMap[i][j][0]
                : item
        )
    );
}

function pushPossiblesOntoStack (stack, currentNode, possiblesMap) {
    const [row, column] = getSmallestClueSet(possiblesMap);

    possiblesMap[row][column].forEach(possible => {
        const nextNode = deepClone(currentNode);
        nextNode[row][column] = possible;
        stack.push(nextNode);
    });
}

function hasNakedSingle (possiblesMap) {
    return possiblesMap.some(possiblesRow =>
        possiblesRow.some(cellPossibles => cellPossibles.length === 1)
    );
}

function restrictionBasedOnRange (possibles, rowNumber, columnNumber) {
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

        const isOnlyPossibleInBox = !boxExcludingThisElement.includes(relevantPossibles[j]);
        const isOnlyPossibleOnRow = !rowExcludingThisElement.includes(relevantPossibles[j]);
        const isOnlyPossibleOnColumn = !columnExcludingThisElement.includes(relevantPossibles[j]);

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
