import React from 'react';
import PropTypes from 'prop-types';
import ResetButton from './reset';
import CheckButton from './check';

const Panel = props => (
    <div>
        <ResetButton onClick={props.resetFunction} />
        <CheckButton onClick={props.checkFunction} />
    </div>
);

Panel.propTypes = {
    resetFunction: PropTypes.func.isRequired,
    checkFunction: PropTypes.func.isRequired
};

export default Panel;
