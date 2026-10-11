import PropTypes from 'prop-types';
import ButtonProvider from './button-provider';
import { IoRefresh as RefreshIcon } from 'react-icons/io5';

const ResetButton = props => (
    <ButtonProvider
        onClick={props.onClick}
        text="Reset"
        icon={RefreshIcon}
    />
);

ResetButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ResetButton;
