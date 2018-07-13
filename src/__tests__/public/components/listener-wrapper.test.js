import React from 'react';
import ListenerWrapper from '../../../public/components/listener-wrapper';
import { mount } from 'enzyme';

it('calls the listener on the wrapper when an event is triggered', () => {
    const spy = jest.fn();
    mount(<ListenerWrapper onKeyPress={spy} />);

    const event = new KeyboardEvent('keydown', { key: 'space' });
    window.dispatchEvent(event);

    expect(spy).toHaveBeenCalled();
});

it('does not call the listener when an event is triggered after unmount', () => {
    const spy = jest.fn();
    const listener = mount(<ListenerWrapper onKeyPress={spy} />);
    listener.unmount();

    const event = new KeyboardEvent('keydown', { key: 'space' });
    window.dispatchEvent(event);

    expect(spy).not.toHaveBeenCalled();
});
