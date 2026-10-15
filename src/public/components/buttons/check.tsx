import ButtonProvider from './button-provider';
import { IoCheckmark as CheckIcon } from 'react-icons/io5';

type CheckButtonProps = {
    onClick: () => void;
};

const CheckButton = (props: CheckButtonProps) => (
    <ButtonProvider
        onClick={props.onClick}
        text="Check"
        icon={CheckIcon}
    />
);

export default CheckButton;
