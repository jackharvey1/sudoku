import { css } from '@emotion/css';
import { type Cell } from '../js/types';

const textClass = css`
    padding: 4px;
    display: inline-block;
`;

type SquareProps = {
    onClick: (box: number, square: number) => void;
    box: number;
    square: number;
    value: Cell;
    isSelected: boolean;
    isLocked: boolean;
    isRelevant: boolean;
    isUnderCheck: boolean;
    isCorrect: boolean;
};

const createSquareClass = (props: SquareProps) => css`
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

const getBackgroundColour = (props: SquareProps) => {
    if (props.isUnderCheck) {
        return props.isCorrect
            ? 'rgba(0, 255, 0, 0.35);'
            : 'rgba(255, 0, 0, 0.35);';
    }
    if (props.isSelected) {
        return 'rgba(0, 66, 99, 0.5);';
    } else if (props.isRelevant) {
        return 'rgba(0, 66, 99, 0.2);';
    }
    return 'rgba(255, 255, 255, 1);';
};

export default function Square (props: SquareProps) {
    return (
        <div
            data-testid={`cell-${props.box}-${props.square}`}
            data-box={props.box}
            data-square={props.square}
            data-selected={props.isSelected}
            data-locked={props.isLocked}
            data-relevant={props.isRelevant}
            data-under-check={props.isUnderCheck}
            data-correct={props.isCorrect}
            className={createSquareClass(props)}
            onClick={() => props.onClick(props.box, props.square)}
        >
            <p className={textClass}>
                {props.value}
            </p>
        </div>
    );
}

export type { SquareProps };
