import { render, screen } from '@testing-library/react';
import { emptySudoku } from '../../sudokus.json';
import { deepClone } from '../../../public/js/utils/array.js';
import Sudoku from '../../../public/components/sudoku';

it('renders every cell and passes selection and locks through', () => {
    const grid = deepClone(emptySudoku);
    grid[0][0] = 7;

    render(<Sudoku
        grid={grid}
        lockedCells={[[0, 0]]}
        selectSquare={() => {}}
        selectedBox={0}
        selectedSquare={0}
        isUnderCheck={false}
        solution={emptySudoku}
    />);

    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(81);
    expect(screen.getByTestId('cell-0-0').textContent).toBe('7');
    expect(screen.getByTestId('cell-0-0')).toHaveAttribute('data-locked', 'true');
    expect(screen.getByTestId('cell-0-0')).toHaveAttribute('data-selected', 'true');
    expect(screen.getByTestId('cell-0-1')).toHaveAttribute('data-locked', 'false');
});
