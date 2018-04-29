import React from 'react';
import Box from '../../components/box';
import ShallowRenderer from 'react-test-renderer/shallow';

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

it('renders the Box component as intended', () => {
    renderer.render(<Box
        box={0}
        values={["1", "", "", "", "", "", "", "", ""]}
        lockedCells={[[0, 1]]}
        selectedBox={0}
        selectedSquare={0}
    />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});
