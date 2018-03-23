import React from 'react';
import Box from '../../components/box';
import ShallowRenderer from 'react-test-renderer/shallow';

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

it('renders the Box component as intended', () => {
    renderer.render(<Box values={["1", "", "", "", "", "", "", "", ""]} />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});
