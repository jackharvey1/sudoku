import ButtonProvider from './button-provider';
import { IoRefresh as RefreshIcon } from 'react-icons/io5';

const ResetButton = props => (
    <ButtonProvider
        onClick={props.onClick}
        text="Reset"
        icon={RefreshIcon}
    />
);

export default ResetButton;
