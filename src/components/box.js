import React, { Component } from 'react';
import { css } from 'react-emotion';
import PropTypes from 'prop-types';
import Square from './square';
import { deepEquals } from '../public/js/utils/array';

const boxClass = css`
    border: 1px solid #000000;
`;

const boxRowClass = css`
    display: table;
`;

class Box extends Component {
    render () {
        return (
            <div className={boxClass}>
                <div className={boxRowClass}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={boxRowClass}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={boxRowClass}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    renderSquare (square) {
        return (<Square
            value={this.props.values[square]}
            onClick={this.props.onClick}
            box={this.props.box}
            square={square}
            isSelected={this.isSelectedSquare(square)}
            isLocked={this.isLocked(square)}
        />);
    }

    isLocked (square) {
        return this.props.lockedCells.some(lockedCell =>
            deepEquals(lockedCell, [this.props.box, square])
        );
    }

    isSelectedSquare (square) {
        return this.props.selectedBox === this.props.box &&
            this.props.selectedSquare === square;
    }

    static get propTypes() {
        return {
            onClick: PropTypes.func,
            selectedBox: PropTypes.number,
            selectedSquare: PropTypes.number,
            values: PropTypes.array,
            box: PropTypes.number,
            lockedCells: PropTypes.array
        };
    }
}

export default Box;
