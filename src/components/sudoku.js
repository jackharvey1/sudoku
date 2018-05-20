import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from './box';

const Row = styled.div`
    display: flex;
`;
class Sudoku extends Component {
    render () {
        return (
            <div>
                <Row>
                    {this.renderBox(0)}
                    {this.renderBox(1)}
                    {this.renderBox(2)}
                </Row>
                <Row>
                    {this.renderBox(3)}
                    {this.renderBox(4)}
                    {this.renderBox(5)}
                </Row>
                <Row>
                    {this.renderBox(6)}
                    {this.renderBox(7)}
                    {this.renderBox(8)}
                </Row>
            </div>
        );
    }

    renderBox (i) {
        return (
            <Box
                box={i}
                values={this.props.grid[i]}
                lockedCells={this.props.lockedCells}
                onClick={this.props.selectSquare}
                selectedBox={this.props.selectedBox}
                selectedSquare={this.props.selectedSquare}
            />
        );
    }

    static get propTypes() {
        return {
            lockedCells: PropTypes.array,
            grid: PropTypes.array,
            selectSquare: PropTypes.func,
            selectedBox: PropTypes.number,
            selectedSquare: PropTypes.number
        };
    }
}

export default Sudoku;
