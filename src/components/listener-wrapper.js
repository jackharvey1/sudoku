import { Component } from 'react';
import PropTypes from 'prop-types';

class ListenerWrapper extends Component {
    render () {
        return this.props.children || null;
    }

    componentDidMount () {
        window.addEventListener("keydown", this.props.onKeyPress);
    }

    componentWillUnmount () {
        window.removeEventListener("keydown", this.props.onKeyPress);
    }

    static get propTypes() {
        return {
            onKeyPress: PropTypes.func,
            children: PropTypes.element
        };
    }
}

export default ListenerWrapper;
