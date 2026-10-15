import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Square from '../../../public/components/square';

function renderSquare (overrides = {}) {
    const onClick = vi.fn();
    render(<Square
        onClick={onClick}
        box={0}
        square={0}
        value={1}
        isSelected={false}
        isLocked={false}
        isRelevant={false}
        isUnderCheck={false}
        isCorrect={true}
        {...overrides}
    />);
    return { onClick, cell: screen.getByTestId('cell-0-0') };
}

it('shows its value and reports its coordinates when clicked', async () => {
    const user = userEvent.setup();
    const { onClick, cell } = renderSquare();

    expect(cell.textContent).toBe('1');
    await user.click(cell);

    expect(onClick).toHaveBeenCalledWith(0, 0);
});

it('marks a locked cell', () => {
    const { cell } = renderSquare({ isLocked: true });
    expect(cell).toHaveAttribute('data-locked', 'true');
});

it('marks a selected cell', () => {
    const { cell } = renderSquare({ isSelected: true });
    expect(cell).toHaveAttribute('data-selected', 'true');
});

it('marks a relevant cell that is not selected', () => {
    const { cell } = renderSquare({ isSelected: false, isRelevant: true });
    expect(cell).toHaveAttribute('data-relevant', 'true');
    expect(cell).toHaveAttribute('data-selected', 'false');
});

it('marks a correct cell that is under check', () => {
    const { cell } = renderSquare({ isUnderCheck: true, isCorrect: true });
    expect(cell).toHaveAttribute('data-under-check', 'true');
    expect(cell).toHaveAttribute('data-correct', 'true');
});

it('marks an incorrect cell that is under check', () => {
    const { cell } = renderSquare({ value: 4, isUnderCheck: true, isCorrect: false });
    expect(cell).toHaveAttribute('data-correct', 'false');
});
