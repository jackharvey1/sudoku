import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    renderSquare(i) {
        const isSelected = this.props.selectedBox === this.props.position && this.props.selectedSquare === i;
        const className = `Square${isSelected ? ' Square--selected' : ''}`;
        return (
            <div
                className={className}
                onClick={() => this.props.onClick(this.props.position, i)}
            >
                {this.props.values[i]}
            </div>
        );
    }

    static get propTypes() {
        return {
            onClick: PropTypes.func,
            selectedBox: PropTypes.number,
            selectedSquare: PropTypes.number,
            values: PropTypes.array,
            position: PropTypes.number
        };
    }
}

export default Box;
