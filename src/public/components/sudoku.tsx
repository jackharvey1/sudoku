import { Component } from 'react';
import { css } from '@emotion/css';
import Box from './box';
import { type Coordinate, type Grid } from '../js/types';

const rowClass = css`
    display: flex;
`;

type SudokuProps = {
    grid: Grid;
    lockedCells: Coordinate[];
    selectSquare: (box: number, square: number) => void;
    selectedBox: number | null;
    selectedSquare: number | null;
    isUnderCheck: boolean;
    solution: Grid;
};

class Sudoku extends Component<SudokuProps> {
    render () {
        return (
            <div>
                <div className={rowClass}>
                    {this.renderBox(0)}
                    {this.renderBox(1)}
                    {this.renderBox(2)}
                </div>
                <div className={rowClass}>
                    {this.renderBox(3)}
                    {this.renderBox(4)}
                    {this.renderBox(5)}
                </div>
                <div className={rowClass}>
                    {this.renderBox(6)}
                    {this.renderBox(7)}
                    {this.renderBox(8)}
                </div>
            </div>
        );
    }

    renderBox (i: number) {
        const lockedCellsInBox = this.props.lockedCells
            .filter(([box]) => box === i)
            .map(([, cell]) => cell);

        return (
            <Box
                box={i}
                onClick={this.props.selectSquare}
                values={this.props.grid[i]}
                lockedCells={lockedCellsInBox}
                selectedBox={this.props.selectedBox}
                selectedSquare={this.props.selectedSquare}
                isUnderCheck={this.props.isUnderCheck}
                solution={this.props.solution[i]}
            />
        );
    }
}

export default Sudoku;
