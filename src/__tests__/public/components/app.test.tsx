import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { emptySudoku, solvedSudoku } from '../../sudokus';
import { generatePuzzle } from '../../../public/js/generator';
import { deepClone } from '../../../public/js/utils/array';
import { type Grid } from '../../../public/js/types';
import App from '../../../public/components/app';

vi.mock('../../../public/js/generator', () => ({
    generatePuzzle: vi.fn()
}));

const generatePuzzleMock = vi.mocked(generatePuzzle);

function puzzle ({
    sudoku = emptySudoku,
    solution = solvedSudoku,
    difficulty = Infinity
}: {
    sudoku?: Grid;
    solution?: Grid;
    difficulty?: number;
} = {}) {
    return {
        sudoku: deepClone(sudoku),
        solution: deepClone(solution),
        difficulty
    };
}

function press (key: string) {
    act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
    });
}

function cell (box: number, square: number) {
    return screen.getByTestId(`cell-${box}-${square}`);
}

beforeEach(() => {
    generatePuzzleMock.mockReset();
    generatePuzzleMock.mockImplementation(() => puzzle());
});

it('renders a board, the difficulty, and both buttons', () => {
    render(<App />);

    expect(screen.getByText('Difficulty: Infinity')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(81);
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check' })).toBeInTheDocument();
    expect(screen.queryByText('Solved!')).not.toBeInTheDocument();
});

it('moves from the top-left cell when an arrow is pressed with nothing selected', () => {
    render(<App />);

    press('ArrowDown');

    expect(cell(0, 3)).toHaveAttribute('data-selected', 'true');
});

it('ignores number keys when nothing is selected', () => {
    const { container } = render(<App />);

    press('1');

    expect(container.querySelector('[data-selected="true"]')).toBeNull();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
});

it('ignores Backspace when nothing is selected', () => {
    const { container } = render(<App />);

    press('Backspace');

    expect(container.querySelector('[data-selected="true"]')).toBeNull();
});

it('loads a new puzzle when Reset is pressed', async () => {
    const user = userEvent.setup();
    generatePuzzleMock
        .mockImplementationOnce(() => puzzle({ difficulty: 1 }))
        .mockImplementationOnce(() => puzzle({ difficulty: 2 }));

    render(<App />);
    expect(screen.getByText('Difficulty: 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByText('Difficulty: 2')).toBeInTheDocument();
});

it('writes a digit into the clicked cell', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(cell(0, 0));
    press('1');

    expect(cell(0, 0).textContent).toBe('1');
});

it('clears a digit with Backspace', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(cell(0, 0));
    press('1');
    press('Backspace');

    expect(cell(0, 0).textContent).toBe('');
});

it('ignores keys that are not a digit, Backspace, or an arrow', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(cell(5, 5));
    press('x');

    expect(cell(5, 5).textContent).toBe('');
    expect(cell(5, 5)).toHaveAttribute('data-selected', 'true');
});

it('selects the cell that was clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(cell(0, 0));

    expect(cell(0, 0)).toHaveAttribute('data-selected', 'true');
});

it('marks every cell as under check', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Check' }));

    expect(cell(0, 0)).toHaveAttribute('data-under-check', 'true');
    expect(cell(8, 8)).toHaveAttribute('data-under-check', 'true');
});

it('does not replace a clue', async () => {
    const user = userEvent.setup();
    const sudoku = deepClone(emptySudoku);
    sudoku[0][0] = solvedSudoku[0][0];
    generatePuzzleMock.mockImplementation(() => puzzle({ sudoku }));

    render(<App />);
    await user.click(cell(0, 0));
    press('1');

    expect(cell(0, 0).textContent).toBe(String(solvedSudoku[0][0]));
});

describe('arrow keys', () => {
    async function startAt (box: number, square: number) {
        const user = userEvent.setup();
        render(<App />);
        await user.click(cell(box, square));
        return user;
    }

    it('moves up from box 0 cell 4 to box 0 cell 1', async () => {
        await startAt(0, 4);
        press('ArrowUp');
        expect(cell(0, 1)).toHaveAttribute('data-selected', 'true');
    });

    it('moves right from box 0 cell 4 to box 0 cell 5', async () => {
        await startAt(0, 4);
        press('ArrowRight');
        expect(cell(0, 5)).toHaveAttribute('data-selected', 'true');
    });

    it('moves left from box 0 cell 4 to box 0 cell 3', async () => {
        await startAt(0, 4);
        press('ArrowLeft');
        expect(cell(0, 3)).toHaveAttribute('data-selected', 'true');
    });

    it('moves down from box 0 cell 4 to box 0 cell 7', async () => {
        await startAt(0, 4);
        press('ArrowDown');
        expect(cell(0, 7)).toHaveAttribute('data-selected', 'true');
    });

    it('does not move above box 0 cell 0', async () => {
        await startAt(0, 0);
        press('ArrowUp');
        expect(cell(0, 0)).toHaveAttribute('data-selected', 'true');
    });

    it('does not move right of box 2 cell 2', async () => {
        await startAt(2, 2);
        press('ArrowRight');
        expect(cell(2, 2)).toHaveAttribute('data-selected', 'true');
    });

    it('does not move left of box 0 cell 0', async () => {
        await startAt(0, 0);
        press('ArrowLeft');
        expect(cell(0, 0)).toHaveAttribute('data-selected', 'true');
    });

    it('does not move below box 6 cell 6', async () => {
        await startAt(6, 6);
        press('ArrowDown');
        expect(cell(6, 6)).toHaveAttribute('data-selected', 'true');
    });
});
