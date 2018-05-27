import React from 'react';
import PropTypes from 'prop-types';
import ButtonProvider from './button-provider';
import RefreshIcon from 'react-icons/lib/io/refresh';

const ResetButton = props => (
    <ButtonProvider
        onClick={props.onClick}
        text="Reset"
        icon={RefreshIcon}
    />
);

ResetButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ResetButton;
