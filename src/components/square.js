import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SquareText = styled.p`
    padding: 4px;
    display: inline-block;
`;

const StyledSquare = styled.div`
    background-color: ${({ isSelected }) =>
        isSelected
            ? 'rgba(0, 66, 99, 0.5);'
            : 'rgba(255, 255, 255, 1);'}

    font-weight: ${(props) =>
        props.isLocked
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

export default function Square (props) {
    return (
        <StyledSquare
            value={props.value}
            box={props.box}
            square={props.square}
            isSelected={props.isSelected}
            isLocked={props.isLocked}
            onClick={() => props.onClick(props.box, props.square)}
        >
            <SquareText>
                {props.value}
            </SquareText>
        </StyledSquare>
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
    isLocked: PropTypes.bool.isRequired
};
