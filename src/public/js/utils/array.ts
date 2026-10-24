import { type Coordinate, type Grid, type PossiblesMap } from '../types';

type DeepValue = number | string | null | DeepValue[];

const getClueCount = <T>(grid: T[][]) =>
    grid
        .map(row =>
            row.filter(item => item !== null).length
        )
        .reduce((totalClues, cluesSubtotal) => totalClues + cluesSubtotal);

const getClueIndices = (sudoku: Grid) =>
    sudoku.flatMap((row, i) =>
        row
            .map((item, j): Coordinate | null =>
                item === null
                    ? null
                    : [i, j]
            )
            .filter((item): item is Coordinate => Boolean(item))
    );

function pickRandomClue (sudoku: Grid) {
    const indexesOfClues = getClueIndices(sudoku);
    const randomIndex = Math.floor(Math.random() * indexesOfClues.length);
    return indexesOfClues[randomIndex];
}

function removeMirroredCluePair (sudoku: Grid) {
    const sudokuCopy = deepClone(sudoku);

    const [firstRandomRow, firstRandomColumn] = pickRandomClue(sudokuCopy);
    const [secondRandomRow, secondRandomColumn] = mirrorCoordinates(firstRandomRow, firstRandomColumn);
    sudokuCopy[firstRandomRow][firstRandomColumn] = null;
    sudokuCopy[secondRandomRow][secondRandomColumn] = null;
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
        const pickedValue = workingArray[indexToPick];
        workingArray.splice(indexToPick, 1);
        return pickedValue;
    });
}

function getSmallestClueSet (possiblesMap: PossiblesMap): Coordinate | null {
    const smallest = possiblesMap.flat()
        .reduce((smallest: { array: number[]; index: number } | null, array, index) =>
            array.length > 1 && (!smallest || smallest.array.length > array.length)
                ? { array, index }
                : smallest
        , null);

    return smallest
        ? [Math.floor(smallest.index / 9), smallest.index % 9]
        : null;
}

function deepEquals (firstArray: DeepValue[], secondArray: DeepValue[]): boolean {
    if (firstArray.length !== secondArray.length) {
        return false;
    }

    for (let i = 0; i < firstArray.length; i++) {
        const left = firstArray[i];
        const right = secondArray[i];
        if (Array.isArray(left)) {
            if (!Array.isArray(right) || !deepEquals(left, right)) {
                return false;
            }
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
