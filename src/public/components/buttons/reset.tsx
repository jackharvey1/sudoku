import ButtonProvider from './button-provider';
import { IoRefresh as RefreshIcon } from 'react-icons/io5';

type ResetButtonProps = {
    onClick: () => void;
};

const ResetButton = (props: ResetButtonProps) => (
    <ButtonProvider
        onClick={props.onClick}
        text="Reset"
        icon={RefreshIcon}
    />
);

export default ResetButton;
