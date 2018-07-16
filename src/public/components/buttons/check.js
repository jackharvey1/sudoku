import React from 'react';
import PropTypes from 'prop-types';
import ButtonProvider from './button-provider';
import CheckIcon from 'react-icons/lib/io/checkmark';

const CheckButton = props => (
    <ButtonProvider
        onClick={props.onClick}
        text="Check"
        icon={CheckIcon}
    />
);

CheckButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default CheckButton;
