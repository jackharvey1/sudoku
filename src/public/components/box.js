import React, { Component } from 'react';
import { css } from 'react-emotion';
import PropTypes from 'prop-types';
import Square from './square';
import customPropTypes from '../custom-prop-types';
import { circularPositionMap } from '../js/utils/transform';

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
            onClick={this.props.onClick}
            box={this.props.box}
            square={square}
            value={this.props.values[square]}
            isSelected={this.isSelectedSquare(square)}
            isLocked={this.isLockedSquare(square)}
            isRelevant={this.isRelevantSquare(square)}
            isUnderCheck={this.props.isUnderCheck}
            isCorrect={this.isCorrect(square)}
        />);
    }

    isCorrect (square) {
        return this.props.values[square] === this.props.solution[square];
    }

    isLockedSquare (square) {
        return this.props.lockedCells.includes(square);
    }

    isSelectedSquare (square) {
        return this.props.selectedBox === this.props.box &&
            this.props.selectedSquare === square;
    }

    isRelevantSquare (square) {
        if (this.props.selectedBox !== null && this.props.selectedSquare !== null) {
            const {
                major: selectedRow,
                minor: selectedColumn
            } = circularPositionMap(this.props.selectedBox, this.props.selectedSquare);
            const { major: row, minor: column } = circularPositionMap(this.props.box, square);

            return this.props.selectedBox === this.props.box ||
                selectedRow === row ||
                selectedColumn === column;
        }

        return false;
    }

    static get propTypes() {
        return {
            onClick: PropTypes.func.isRequired,
            box: PropTypes.number.isRequired,
            values: PropTypes.array.isRequired,
            lockedCells: PropTypes.array.isRequired,
            selectedBox: customPropTypes.numberOrNull,
            selectedSquare: customPropTypes.numberOrNull,
            isUnderCheck: PropTypes.bool.isRequired,
            solution: PropTypes.array.isRequired
        };
    }
}

export default Box;
