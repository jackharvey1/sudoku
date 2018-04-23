import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WinMessage extends Component {
    render () {
        return this.props.solved
            ? (<div className="WinMessage-container">
                <div className="WinMessage">
                    <p className="WinMessage-text">Solved!</p>
                    <button className="WinMessage-button" onClick={this.props.resetFunction}>Again?</button>
                </div>
            </div>)
            : null;
    }

    static get propTypes() {
        return {
            solved: PropTypes.bool,
            resetFunction: PropTypes.func
        };
    }
}

export default WinMessage;
