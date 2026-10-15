import { render, screen } from '@testing-library/react';
import Box from '../../../public/components/box';

function renderBox (overrides = {}) {
    return render(<Box
        box={0}
        onClick={() => null}
        values={['1', '', '', '', '', '', '', '', '']}
        isUnderCheck={false}
        selectedBox={0}
        selectedSquare={0}
        lockedCells={[0, 1]}
        solution={['1', '', '', '', '', '', '', '', '']}
        {...overrides}
    />);
}

function cell (square: number) {
    return screen.getByTestId(`cell-0-${square}`);
}

it('marks the locked cell and the selected cell', () => {
    renderBox({
        lockedCells: [1],
        solution: ['1', '', '2', '', '', '', '', '', '']
    });

    expect(cell(1)).toHaveAttribute('data-locked', 'true');
    expect(cell(0)).toHaveAttribute('data-locked', 'false');
    expect(cell(0)).toHaveAttribute('data-selected', 'true');
    expect(cell(0)).toHaveAttribute('data-correct', 'true');
    expect(cell(2)).toHaveAttribute('data-correct', 'false');
});

it('marks nothing relevant when no cell is selected', () => {
    renderBox({ selectedBox: null, selectedSquare: null });

    expect(cell(4)).toHaveAttribute('data-relevant', 'false');
    expect(cell(4)).toHaveAttribute('data-selected', 'false');
});

it('marks a cell relevant when it shares a row', () => {
    renderBox({ selectedBox: 1, selectedSquare: 5, lockedCells: [0, 1] });

    expect(cell(4)).toHaveAttribute('data-relevant', 'true');
});

it('marks a cell relevant when it shares a column', () => {
    renderBox({ selectedBox: 3, selectedSquare: 1 });

    expect(cell(7)).toHaveAttribute('data-relevant', 'true');
});

it('marks a cell relevant when it is in the same box', () => {
    renderBox({ selectedBox: 0, selectedSquare: 5 });

    expect(cell(8)).toHaveAttribute('data-relevant', 'true');
});
