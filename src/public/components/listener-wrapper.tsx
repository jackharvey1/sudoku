import { Component, type ReactNode } from 'react';

type ListenerWrapperProps = {
    onKeyPress: (event: KeyboardEvent) => void;
    children: ReactNode;
};

class ListenerWrapper extends Component<ListenerWrapperProps> {
    render () {
        return this.props.children;
    }

    componentDidMount () {
        window.addEventListener('keydown', this.props.onKeyPress);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.props.onKeyPress);
    }
}

export default ListenerWrapper;
