import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './box';
import ListenerWrapper from './listener-wrapper';
import '../sudoku.css';
import { circularPositionMap } from '../lib/utils/transform';

class Sudoku extends Component {
    constructor (props) {
        super(props);

        const grid = props.grid;

        this.state = {
            values: grid,
            selectedBox: null,
            selectedSquare: null
        };
    }

    render () {
        return (
            <ListenerWrapper onKeyPress={this.handleKeyDown.bind(this)}>
                <div>
                    <div className="Row">
                        {this.renderBox(0)}
                        {this.renderBox(1)}
                        {this.renderBox(2)}
                    </div>
                    <div className="Row">
                        {this.renderBox(3)}
                        {this.renderBox(4)}
                        {this.renderBox(5)}
                    </div>
                    <div className="Row">
                        {this.renderBox(6)}
                        {this.renderBox(7)}
                        {this.renderBox(8)}
                    </div>
                </div>
            </ListenerWrapper>
        );
    }

    renderBox (i) {
        return (
            <Box
                position={i}
                values={this.state.values[i]}
                onClick={this.selectSquare.bind(this)}
                selectedBox={this.state.selectedBox}
                selectedSquare={this.state.selectedSquare}
            />
        );
    }

    handleKeyDown ({ key }) {
        const { selectedBox, selectedSquare } = this.state;
        let { major: row, minor: column } = circularPositionMap(selectedBox, selectedSquare);

        if (/[1-9]/.test(key)) {
            this.insertValue(key);
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

        this.setState({
            selectedBox: box,
            selectedSquare: square
        });
    }

    selectSquare (box, square) {
        this.setState({
            selectedBox: box,
            selectedSquare: square
        });
    }

    insertValue (value) {
        const nextValues = this.state.values.slice();
        const relevantValue = value[value.length - 1];
        const { selectedBox: box, selectedSquare: square } = this.state;
        nextValues[box][square] = Number(relevantValue);
        this.setState({ values: nextValues });
    }

    static get propTypes() {
        return {
            onChange: PropTypes.func,
            grid: PropTypes.array
        };
    }
}

export default Sudoku;
