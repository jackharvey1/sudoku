import React, { Component } from 'react';

import Sudoku from './sudoku';
import ListenerWrapper from './listener-wrapper';
import WinMessage from './win-message';

import { generatePuzzle } from '../lib/generator';
import { deepEquals, getClueIndices } from '../lib/utils/array';
import { circularPositionMap } from '../lib/utils/transform';

class App extends Component {
    constructor () {
        super();

        this.state = generateState();
    }

    render () {
        if (this.state.sudoku) {
            const isSolved = deepEquals(this.state.solution, this.state.sudoku);

            return (
                <div className="App">
                    <ListenerWrapper onKeyPress={this.handleKeyDown.bind(this)}>
                        <WinMessage
                            solved={isSolved}
                            resetFunction={this.reset.bind(this)}
                        />
                        <Sudoku
                            grid={this.state.sudoku}
                            lockedCells={this.state.lockedCells}
                            selectSquare={this.selectSquare.bind(this)}
                            selectedBox={this.state.selectedBox}
                            selectedSquare={this.state.selectedSquare}
                        />
                        <p>Difficulty: {this.state.difficulty}</p>
                    </ListenerWrapper>
                </div>
            );
        }
        return null;
    }

    handleKeyDown ({ key }) {
        const { selectedBox, selectedSquare } = this.state;
        let { major: row, minor: column } = circularPositionMap(selectedBox, selectedSquare);

        const isLockedCell = this.state.lockedCells.some(lockedCell =>
            deepEquals(lockedCell, [selectedBox, selectedSquare])
        );

        if (/[1-9]/.test(key) && !isLockedCell) {
            this.insertValue(key);
        } else if (key === 'ArrowUp') {
            row = row === 0 ? row : row - 1;
        } else if (key === 'ArrowLeft') {
            column = column === 0 ? column : column - 1;
        } else if (key === 'ArrowRight') {
            column = column === 8 ? column : column + 1;
        } else if (key === 'ArrowDown') {
            row = row === 8 ? row : row + 1;
        }

        const { major: box, minor: square } = circularPositionMap(row, column);

        this.selectSquare(box, square);
    }

    selectSquare (box, square) {
        this.setState({
            selectedBox: box,
            selectedSquare: square
        });
    }

    insertValue (value) {
        const nextValues = this.state.sudoku.slice();
        const relevantValue = value[value.length - 1];
        const { selectedBox: box, selectedSquare: square } = this.state;
        nextValues[box][square] = Number(relevantValue);
        this.setState({ sudoku: nextValues });
    }

    reset () {
        this.setState(generateState);
    }
}

function generateState () {
    const { solution, sudoku, difficulty } = generatePuzzle();
    const lockedCells = getClueIndices(sudoku);
    return {
        solution,
        sudoku,
        lockedCells,
        difficulty,
        selectedBox: null,
        selectedSquare: null
    };
}

export default App;
