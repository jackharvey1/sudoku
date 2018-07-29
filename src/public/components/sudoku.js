import React, { Component } from 'react';
import { css } from 'react-emotion';
import PropTypes from 'prop-types';
import Box from './box';

const rowClass = css`
    display: flex;
`;
class Sudoku extends Component {
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

    renderBox (i) {
        const lockedCellsInBox = this.props.lockedCells
            .filter(([box]) => box === i)
            .map(([, cell]) => cell);

        return (
            <Box
                box={i}
                values={this.props.grid[i]}
                lockedCells={lockedCellsInBox}
                onClick={this.props.selectSquare}
                selectedBox={this.props.selectedBox}
                selectedSquare={this.props.selectedSquare}
            />
        );
    }

    static get propTypes() {
        return {
            lockedCells: PropTypes.array.isRequired,
            grid: PropTypes.array.isRequired,
            selectSquare: PropTypes.func,
            selectedBox: PropTypes.number,
            selectedSquare: PropTypes.number
        };
    }
}

export default Sudoku;
