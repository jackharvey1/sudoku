import { Component } from 'react';
import { css } from '@emotion/css';
import Square from './square';
import { type Cell } from '../js/types';
import { circularPositionMap } from '../js/utils/transform';

const boxClass = css`
    border: 1px solid #000000;
`;

const boxRowClass = css`
    display: table;
`;

type BoxProps = {
    box: number;
    onClick: (box: number, square: number) => void;
    values: Cell[];
    lockedCells: number[];
    selectedBox: number | null;
    selectedSquare: number | null;
    isUnderCheck: boolean;
    solution: Cell[];
};

class Box extends Component<BoxProps> {
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

    renderSquare (square: number) {
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

    isCorrect (square: number) {
        return this.props.values[square] === this.props.solution[square];
    }

    isLockedSquare (square: number) {
        return this.props.lockedCells.includes(square);
    }

    isSelectedSquare (square: number) {
        return this.props.selectedBox === this.props.box &&
            this.props.selectedSquare === square;
    }

    isRelevantSquare (square: number) {
        const { selectedBox, selectedSquare } = this.props;
        if (selectedBox !== null && selectedSquare !== null) {
            const {
                major: selectedRow,
                minor: selectedColumn
            } = circularPositionMap(selectedBox, selectedSquare);
            const { major: row, minor: column } = circularPositionMap(this.props.box, square);

            return selectedBox === this.props.box ||
                selectedRow === row ||
                selectedColumn === column;
        }

        return false;
    }
}

export default Box;
export type { BoxProps };
