function circularTransform(sudoku) {
    const width = Math.sqrt(sudoku.length);
    const transformedSudoku = Array(sudoku.length)
        .fill(null)
        .map(() => []);

    for (let major = 0; major < sudoku.length; major++) {
        const majorGroup = Math.floor(major / width) * width;
        const minorGroup = (major % width) * width;

        for (let minor = majorGroup; minor < majorGroup + width; minor++) {
            transformedSudoku[major] = transformedSudoku[major]
                .concat(
                    sudoku[minor].slice(minorGroup, minorGroup + width)
                );
        }
    }
    return transformedSudoku;
}

function circularPositionMap (major, minor) {
    const majorGroup = Math.floor(major / 3);
    const minorGroup = Math.floor(minor / 3);
    return {
        major: (majorGroup * 3) + minorGroup,
        minor: ((major % 3) * 3) + (minor % 3)
    };
}

const getColumn = (sudoku, columnNumber) =>
    sudoku.map(row => row[columnNumber]);

export {
    circularTransform,
    circularPositionMap,
    getColumn
};
