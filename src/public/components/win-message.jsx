import { css } from '@emotion/css';

const backgroundClass = css`
    display: block;
    position: absolute;
    background-color: rgba(255,255,255,0.8);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

const containerClass = css`
    margin: 0 auto;
    font-size: 32px;
    font-family: arial;
`;

const textClass = css`
    margin: 0 auto;
`;

const buttonClass = css`
    margin: 0 auto;
    display: block;
`;

const WinMessage = props =>
    props.solved
        ? (<div className={backgroundClass}>
            <div className={containerClass}>
                <p className={textClass}>Solved!</p>
                <button className={buttonClass}onClick={props.resetFunction}>Again?</button>
            </div>
        </div>)
        : null;

export default WinMessage;
