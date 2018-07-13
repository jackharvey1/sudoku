import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const buttonClass = css`
    border: none;
    padding: 0;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
        outline: none;
    }
`;

const iconClass = css`
    font-size: 32px;
`;

const ButtonProvider = props => {
    const Icon = props.icon;
    return (
        <button className={buttonClass} onClick={props.onClick}>
            <Icon className={iconClass} />
            <p>{props.text}</p>
        </button>
    );
};

ButtonProvider.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.func
};

export default ButtonProvider;
