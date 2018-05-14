import React from 'react';
import Sudoku from '../../components/sudoku';
import ShallowRenderer from 'react-test-renderer/shallow';
import { emptySudoku } from '../sudokus.json';

it('renders the Sudoku component as intended', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Sudoku grid={emptySudoku} />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});
