import React from 'react';
import App from '../../components/app';
import ShallowRenderer from 'react-test-renderer/shallow';

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

it('renders the App component as intended', () => {
    renderer.render(<App />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});
