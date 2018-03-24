import React from 'react';
import App from '../../components/app';
import ShallowRenderer from 'react-test-renderer/shallow';
import { emptySudoku } from '../sudokus.json';
import { generatePuzzle } from '../../lib/generator';

jest.mock('../../lib/generator');

generatePuzzle.mockImplementation(() => ({
    sudoku: emptySudoku,
    difficulty: Infinity
}));

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

it('renders the App component as intended', () => {
    renderer.render(<App />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});
