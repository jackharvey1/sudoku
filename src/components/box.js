import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Square from './square';
import { deepEquals } from '../lib/utils/array';

const StyledBox = styled.div`
    border: 1px solid #000000;
`;

const SquareContainer = styled.div`
    display: table;
`;

class Box extends Component {
    render () {
        return (
            <StyledBox>
                <SquareContainer>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </SquareContainer>
                <SquareContainer>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </SquareContainer>
                <SquareContainer>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </SquareContainer>
            </StyledBox>
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
