import React from 'react';
import Box from '../../components/box';
import Renderer from 'react-test-renderer';

it('renders the Box component as intended', () => {
    const box = Renderer.create(<Box
        onClick={() => null}
        box={0}
        values={["1", "", "", "", "", "", "", "", ""]}
        lockedCells={[[0, 1]]}
        selectedBox={0}
        selectedSquare={0}
    />);
    expect(box.toJSON()).toMatchSnapshot();
});
