import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const buttonClass = css`
    padding: 0;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const buttonContainerClass = css`
    border: none;

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
        <button className={buttonContainerClass} onClick={props.onClick}>
            <div className={buttonClass}>
                <Icon className={iconClass} />
                <p>{props.text}</p>
            </div>
        </button>
    );
};

ButtonProvider.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.func
};

export default ButtonProvider;
