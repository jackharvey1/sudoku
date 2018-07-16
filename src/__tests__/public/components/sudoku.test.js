import React from 'react';
import Sudoku from '../../../public/components/sudoku';
import ShallowRenderer from 'react-test-renderer/shallow';
import { emptySudoku } from '../../sudokus.json';

it('renders the Sudoku component as intended', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Sudoku
        grid={emptySudoku}
        lockedCells={[]}
        selectSquare={() => {}}
        selectedBox={0}
        selectedSquare={0}
        isUnderCheck={false}
        solution={emptySudoku}
    />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});
