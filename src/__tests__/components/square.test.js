import React from 'react';
import Square from '../../components/square';
import ShallowRenderer from 'react-test-renderer/shallow';

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

describe('Square component', () => {
    it('renders as expected in basic state', () => {
        renderer.render(<Square
            value={1}
            onClick={() => {}}
            box={0}
            square={0}
            isSelected={false}
            isLocked={false}
        />);
        const output = renderer.getRenderOutput();
        expect(output).toMatchSnapshot();
    });

    it('renders with bold text when locked', () => {
        renderer.render(<Square
            value={1}
            onClick={() => {}}
            box={0}
            square={0}
            isSelected={false}
            isLocked={true}
        />);
        const output = renderer.getRenderOutput();
        expect(output).toMatchSnapshot();
    });

    it('renders with background when selected', () => {
        renderer.render(<Square
            value={1}
            onClick={() => {}}
            box={0}
            square={0}
            isSelected={true}
            isLocked={false}
        />);
        const output = renderer.getRenderOutput();
        expect(output).toMatchSnapshot();
    });
});
