function getClueCount (sudoku) {
    return sudoku
        .map(row =>
            row.filter(item => item !== '').length
        )
        .reduce((totalClues, cluesSubtotal) => totalClues + cluesSubtotal);
}

function getClueIndices (sudoku) {
    return [].concat(
        ...sudoku.map((row, i) =>
            row
                .map((item, j) =>
                    item === ''
                        ? null
                        : [i, j]
                )
                .filter(Boolean)
        )
    );
}

function pickRandomClue (sudoku) {
    const indexesOfClues = getClueIndices(sudoku);
    const randomIndex = Math.floor(Math.random() * indexesOfClues.length);
    return indexesOfClues[randomIndex];
}

function removeMirroredCluePair (sudoku) {
    const sudokuCopy = JSON.parse(JSON.stringify(sudoku));

    const [firstRandomRow, firstRandomColumn] = pickRandomClue(sudokuCopy);
    const [secondRandomRow, secondRandomColumn] = mirrorCoordinates(firstRandomRow, firstRandomColumn);
    sudokuCopy[firstRandomRow][firstRandomColumn] = '';
    sudokuCopy[secondRandomRow][secondRandomColumn] = '';
    return sudokuCopy;
}

function mirrorCoordinates(row, column) {
    const sudokuWidth = 8;
    const mirroredRow = (sudokuWidth - row);
    const mirroredColumn = (sudokuWidth - column);
    return [mirroredRow, mirroredColumn];
}

function shuffleArray (array) {
    const workingArray = array.slice();
    return array.map(() => {
        const indexToPick = Math.floor(Math.random() * workingArray.length);
        const pickedValue = workingArray[indexToPick];
        workingArray.pop();
        return pickedValue;
    });
}

function getSmallestClueSet (array) {
    const flattenedIndex = [].concat(...array).reduce((smallest, array, index) =>
        array.length > 1 && (!smallest || smallest.array.length > array.length)
            ? { array, index }
            : smallest
        , null).index;

    return [Math.floor(flattenedIndex / 9), flattenedIndex % 9];
}

function deepEquals (firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }

    for (let i = 0; i < firstArray.length; i++) {
        if (Array.isArray(firstArray[i])) {
            return Array.isArray(secondArray[i])
                ? deepEquals(firstArray[i], secondArray[i])
                : false;
        } else if (firstArray[i] !== secondArray[i]) {
            return false;
        }
    }
    return true;
}

const arrayExcludingElement = (array, index) =>
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
    arrayExcludingElement
};
