import React, { Component } from 'react';
import { css } from 'react-emotion';
import Sudoku from './sudoku';
import ListenerWrapper from './listener-wrapper';
import WinMessage from './win-message';
import Panel from './buttons/panel';

import { generatePuzzle } from '../js/generator';
import { deepClone, deepEquals, getClueIndices } from '../js/utils/array';
import { circularPositionMap } from '../js/utils/transform';

const appClass = css`
    width: 294px;
    font-family: sans-serif;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const difficultyMessageClass = css`
    margin-bottom: 8px;
`;

class App extends Component {
    constructor () {
        super();

        this.state = generateState();
    }

    render () {
        if (this.state.sudoku) {
            const isSolved = deepEquals(this.state.solution, this.state.sudoku);

            return (
                <div className={appClass}>
                    <ListenerWrapper onKeyPress={this.handleKeyDown.bind(this)}>
                        <div className={difficultyMessageClass}>Difficulty: {this.state.difficulty}</div>
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
                            isUnderCheck={this.state.isUnderCheck}
                            solution={this.state.solution}
                        />
                        <Panel
                            resetFunction={this.reset.bind(this)}
                            checkFunction={this.check.bind(this)}
                        />
                    </ListenerWrapper>
                </div>
            );
        }
        return null;
    }

    handleKeyDown ({ key }) {
        this.setState({
            isUnderCheck: false
        });

        const { selectedBox, selectedSquare } = this.state;
        let { major: row, minor: column } = circularPositionMap(selectedBox, selectedSquare);

        const isLockedCell = this.state.lockedCells.some(lockedCell =>
            deepEquals(lockedCell, [selectedBox, selectedSquare])
        );

        if (/[1-9]/.test(key) && !isLockedCell) {
            this.insertValue(key);
        } else if (key === 'Backspace' && !isLockedCell) {
            this.deleteValue();
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
            selectedSquare: square,
            isUnderCheck: false
        });
    }

    insertValue (value) {
        const nextValues = deepClone(this.state.sudoku);
        const relevantValue = value[value.length - 1];
        const { selectedBox: box, selectedSquare: square } = this.state;
        nextValues[box][square] = Number(relevantValue);
        this.setState({ sudoku: nextValues });
    }

    deleteValue () {
        const nextValues = deepClone(this.state.sudoku);
        const { selectedBox: box, selectedSquare: square } = this.state;
        nextValues[box][square] = '';
        this.setState({ sudoku: nextValues });
    }

    reset () {
        this.setState(generateState);
    }

    check () {
        this.setState({
            isUnderCheck: true
        });
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
        selectedSquare: null,
        isUnderCheck: false
    };
}

export default App;
