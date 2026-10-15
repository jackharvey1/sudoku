import ResetButton from './reset';
import CheckButton from './check';

type PanelProps = {
    resetFunction: () => void;
    checkFunction: () => void;
};

const Panel = (props: PanelProps) => (
    <div>
        <ResetButton onClick={props.resetFunction} />
        <CheckButton onClick={props.checkFunction} />
    </div>
);

export default Panel;
