import { type Coordinate, type Grid } from '../types';

type DeepValue = number | string | null | DeepValue[];

function getClueCount (grid: unknown[][]) {
    return grid
        .map(row =>
            row.filter(item => item !== '').length
        )
        .reduce((totalClues, cluesSubtotal) => totalClues + cluesSubtotal);
}

function getClueIndices (sudoku: Grid) {
    const rowsOfClues = sudoku.map((row, i) =>
        row
            .map((item, j): Coordinate | null =>
                item === ''
                    ? null
                    : [i, j]
            )
            .filter((item): item is Coordinate => Boolean(item))
    );

    return ([] as Coordinate[]).concat(...rowsOfClues);
}

function pickRandomClue (sudoku: Grid) {
    const indexesOfClues = getClueIndices(sudoku);
    const randomIndex = Math.floor(Math.random() * indexesOfClues.length);
    return indexesOfClues[randomIndex] as Coordinate;
}

function removeMirroredCluePair (sudoku: Grid) {
    const sudokuCopy = deepClone(sudoku);

    const [firstRandomRow, firstRandomColumn] = pickRandomClue(sudokuCopy);
    const [secondRandomRow, secondRandomColumn] = mirrorCoordinates(firstRandomRow, firstRandomColumn);
    sudokuCopy[firstRandomRow][firstRandomColumn] = '';
    sudokuCopy[secondRandomRow][secondRandomColumn] = '';
    return sudokuCopy;
}

function mirrorCoordinates (row: number, column: number): Coordinate {
    const sudokuWidth = 8;
    const mirroredRow = (sudokuWidth - row);
    const mirroredColumn = (sudokuWidth - column);
    return [mirroredRow, mirroredColumn];
}

function shuffleArray <T>(array: T[]) {
    const workingArray = array.slice();
    return array.map(() => {
        const indexToPick = Math.floor(Math.random() * workingArray.length);
        const pickedValue = workingArray[indexToPick] as T;
        workingArray.splice(indexToPick, 1);
        return pickedValue;
    });
}

function getSmallestClueSet (array: number[][][]) {
    const flattenedIndex = ([] as number[][]).concat(...array)
        .reduce((smallest: { array: number[]; index: number } | null, cell, index) =>
            cell.length > 1 && (!smallest || smallest.array.length > cell.length)
                ? { array: cell, index }
                : smallest
        , null);

    const index = (flattenedIndex as { index: number }).index;
    return [Math.floor(index / 9), index % 9] as Coordinate;
}

function deepEquals (firstArray: DeepValue[], secondArray: DeepValue[]): boolean {
    if (firstArray.length !== secondArray.length) {
        return false;
    }

    for (let i = 0; i < firstArray.length; i++) {
        const left = firstArray[i];
        const right = secondArray[i];
        if (Array.isArray(left)) {
            return Array.isArray(right)
                ? deepEquals(left, right)
                : false;
        } else if (left !== right) {
            return false;
        }
    }
    return true;
}

function deepClone <T>(array: T[]): T[] {
    return array.map(element =>
        Array.isArray(element)
            ? deepClone(element as T[]) as T
            : element
    );
}

const arrayExcludingElement = <T>(array: T[], index: number) =>
    [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];

export {
    getClueCount,
    getClueIndices,
    pickRandomClue,
    removeMirroredCluePair,
    mirrorCoordinates,
    shuffleArray,
    getSmallestClueSet,
    deepEquals,
    deepClone,
    arrayExcludingElement
};
