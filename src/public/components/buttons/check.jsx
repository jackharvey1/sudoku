import ButtonProvider from './button-provider';
import { IoCheckmark as CheckIcon } from 'react-icons/io5';

const CheckButton = props => (
    <ButtonProvider
        onClick={props.onClick}
        text="Check"
        icon={CheckIcon}
    />
);

export default CheckButton;
