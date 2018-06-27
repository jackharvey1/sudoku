import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WinMessage from '../../components/win-message';

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

describe('Win message component', () => {
    it('renders the win message as expected when sudoku is solved', () => {
        renderer.render(<WinMessage
            solved={true}
            resetFunction={() => {}}
        />);
        const output = renderer.getRenderOutput();
        expect(output).toMatchSnapshot();
    });

    it('returns null when the sudoku is not solved', () => {
        renderer.render(<WinMessage
            solved={false}
            resetFunction={() => {}}
        />);
        const output = renderer.getRenderOutput();
        expect(output).toMatchSnapshot();
    });
});
