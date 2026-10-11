import { render } from '@testing-library/react';
import { act } from 'react';
import ListenerWrapper from '../../../public/components/listener-wrapper';

function press () {
    act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    });
}

it('forwards keydown events from the window', () => {
    const onKeyPress = vi.fn();
    render(<ListenerWrapper onKeyPress={onKeyPress}><div /></ListenerWrapper>);

    press();

    expect(onKeyPress).toHaveBeenCalledOnce();
});

it('removes the listener on unmount', () => {
    const onKeyPress = vi.fn();
    const { unmount } = render(
        <ListenerWrapper onKeyPress={onKeyPress}><div /></ListenerWrapper>
    );

    unmount();
    press();

    expect(onKeyPress).not.toHaveBeenCalled();
});
