import { Component } from 'react';
import { css } from '@emotion/css';
import Sudoku from './sudoku';
import ListenerWrapper from './listener-wrapper';
import WinMessage from './win-message';
import Panel from './buttons/panel';

import { generatePuzzle } from '../js/generator';
import { deepClone, deepEquals, getClueIndices } from '../js/utils/array';
import { circularPositionMap } from '../js/utils/transform';
import { type Coordinate, type Grid } from '../js/types';

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

type AppState = {
    solution: Grid;
    sudoku: Grid;
    lockedCells: Coordinate[];
    difficulty: number;
    selectedBox: number | null;
    selectedSquare: number | null;
    isUnderCheck: boolean;
};

class App extends Component<object, AppState> {
    constructor (props: object) {
        super(props);
        this.state = generateState();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    render () {
        const isSolved = deepEquals(this.state.solution, this.state.sudoku);

        return (
            <div className={appClass}>
                <ListenerWrapper onKeyPress={this.handleKeyDown}>
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

    handleKeyDown ({ key }: KeyboardEvent) {
        this.setState({
            isUnderCheck: false
        });

        const { selectedBox, selectedSquare } = this.state;
        const isEditKey = (/[1-9]/).test(key) || key === 'Backspace';

        // With nothing selected there is nothing to edit; other keys act from the top-left cell.
        if (selectedBox === null || selectedSquare === null) {
            if (!isEditKey) {
                this.moveSelection(0, 0, key);
            }
            return;
        }

        const isLockedCell = this.state.lockedCells.some(lockedCell =>
            deepEquals(lockedCell, [selectedBox, selectedSquare])
        );

        if (isEditKey && !isLockedCell) {
            if (key === 'Backspace') {
                this.deleteValue(selectedBox, selectedSquare);
            } else {
                this.insertValue(selectedBox, selectedSquare, key);
            }
        }

        this.moveSelection(selectedBox, selectedSquare, key);
    }

    moveSelection (selectedBox: number, selectedSquare: number, key: string) {
        let { major: row, minor: column } = circularPositionMap(selectedBox, selectedSquare);

        if (key === 'ArrowUp') {
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

    selectSquare (box: number, square: number) {
        this.setState({
            selectedBox: box,
            selectedSquare: square,
            isUnderCheck: false
        });
    }

    insertValue (box: number, square: number, value: string) {
        const nextValues = deepClone(this.state.sudoku);
        const relevantValue = value[value.length - 1];
        nextValues[box][square] = Number(relevantValue);
        this.setState({ sudoku: nextValues });
    }

    deleteValue (box: number, square: number) {
        const nextValues = deepClone(this.state.sudoku);
        nextValues[box][square] = null;
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

function generateState (): AppState {
    const { solution, sudoku, difficulty } = generatePuzzle();
    return {
        solution,
        sudoku,
        lockedCells: getClueIndices(sudoku),
        difficulty,
        selectedBox: null,
        selectedSquare: null,
        isUnderCheck: false
    };
}

export default App;
