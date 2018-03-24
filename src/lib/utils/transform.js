function circularTransform(sudoku) {
    const width = Math.sqrt(sudoku.length);
    const transformedSudoku = Array(sudoku.length)
        .fill(null)
        .map(() => []);

    for (let boxNumber = 0; boxNumber < sudoku.length; boxNumber++) {
        const fromTop = Math.floor(boxNumber / width) * width;
        const fromLeft = (boxNumber % width) * width;

        for (let boxRow = fromTop; boxRow < fromTop + width; boxRow++) {
            transformedSudoku[boxNumber] = transformedSudoku[boxNumber]
                .concat(
                    sudoku[boxRow].slice(fromLeft, fromLeft + width)
                );
        }
    }
    return transformedSudoku;
}

function circularPositionMap (row, column) {
    const fromTop = Math.floor(row / 3);
    const fromLeft = Math.floor(column / 3);
    return {
        major: (fromTop * 3) + fromLeft,
        minor: ((row % 3) * 3) + (column % 3)
    };
}

const getColumn = (sudoku, columnNumber) =>
    sudoku.map(row => row[columnNumber]);

export {
    circularTransform,
    circularPositionMap,
    getColumn
};
