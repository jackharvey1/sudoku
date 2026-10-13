import { Component } from 'react';

class ListenerWrapper extends Component {
    render () {
        return this.props.children;
    }

    componentDidMount () {
        window.addEventListener("keydown", this.props.onKeyPress);
    }

    componentWillUnmount () {
        window.removeEventListener("keydown", this.props.onKeyPress);
    }
}

export default ListenerWrapper;
