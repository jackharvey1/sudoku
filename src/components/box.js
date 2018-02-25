import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Box extends Component {
    render () {
        return (
            <div className="Box">
                <div>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    renderSquare(i) {
        return (
            <input
                type="text"
                className="Square"
                value={this.props.values[i]}
                onChange={(event) => this.props.onChange(event, this.props.position, i)}
            />
        );
    }

    static get propTypes() {
        return {
            onChange: PropTypes.func,
            values: PropTypes.array,
            position: PropTypes.number
        };
    }
}

export default Box;
