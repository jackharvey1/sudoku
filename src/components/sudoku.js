import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from './box';
import '../sudoku.css';

class Sudoku extends Component {
    constructor () {
        super();

        this.state = {
            values: [...Array(9)].map(() => Array(9).fill(""))
        };
    }

    render () {
        return (
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
        );
    }

    renderBox (i) {
        return (
            <Box
                position={i}
                values={this.state.values[i]}
                onChange={this.onChange.bind(this)}
            />
        );
    }

    onChange ({ target: { value } }, box, square) {
        const nextValues = this.state.values.slice();
        nextValues[box][square] = value;
        this.setState({ values: nextValues });
    }

    static get propTypes() {
        return {
            onChange: PropTypes.func
        };
    }
}

export default Sudoku;
