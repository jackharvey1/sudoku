import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deepEquals } from '../lib/utils/array';

class Box extends Component {
    render () {
        return (
            <div className="Box">
                <div className="Box-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="Box-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="Box-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    renderSquare(square) {
        const className = this.getClassName(square);
        return (
            <div
                className={className}
                onClick={() => this.props.onClick(this.props.box, square)}
            >
                {this.props.values[square]}
            </div>
        );
    }

    getClassName (square) {
        const isSelected = this.props.selectedBox === this.props.box &&
            this.props.selectedSquare === square;
        const isLocked = this.props.lockedCells.some(lockedCell =>
            deepEquals(lockedCell, [this.props.box, square])
        );
        const selectedClass = isSelected ? ' Square--selected' : '';
        const lockedClass = isLocked ? ' Square--locked' : '';
        return `Square${selectedClass}${lockedClass}`;
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
