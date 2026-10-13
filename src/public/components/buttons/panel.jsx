import ResetButton from './reset';
import CheckButton from './check';

const Panel = props => (
    <div>
        <ResetButton onClick={props.resetFunction} />
        <CheckButton onClick={props.checkFunction} />
    </div>
);

export default Panel;
