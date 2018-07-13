import React from 'react';
import { css } from 'react-emotion';
import PropTypes from 'prop-types';

const textClass = css`
    padding: 4px;
    display: inline-block;
`;

const createSquareClass = props => css`
    background-color: ${getBackgroundColour(props)}

    font-weight: ${props.isLocked
        ? 'bold;'
        : 'normal;'}

    display: inline-block;

    width: 24px;
    height: 24px;

    padding: 3px;

    text-align: center;
    vertical-align: middle;

    border: 1px solid rgb(64, 64, 64);
`;

const getBackgroundColour = props => {
    if (props.isSelected) {
        return 'rgba(0, 66, 99, 0.5);';
    } else if (props.isRelevant) {
        return 'rgba(0, 66, 99, 0.2);';
    }
    return 'rgba(255, 255, 255, 1);';
};

export default function Square (props) {
    return (
        <div
            className={createSquareClass(props)}
            onClick={() => props.onClick(props.box, props.square)}
        >
            <p className={textClass}>
                {props.value}
            </p>
        </div>
    );
}

Square.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    box: PropTypes.number.isRequired,
    square: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    isRelevant: PropTypes.bool.isRequired
};
