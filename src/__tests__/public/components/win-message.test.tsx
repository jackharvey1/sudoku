import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WinMessage from '../../../public/components/win-message';

it('shows the solved overlay and calls reset', async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    render(<WinMessage solved={true} resetFunction={reset} />);

    expect(screen.getByText('Solved!')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Again?' }));

    expect(reset).toHaveBeenCalledOnce();
});

it('renders nothing when the puzzle is not solved', () => {
    const { container } = render(<WinMessage solved={false} resetFunction={() => {}} />);

    expect(container).toBeEmptyDOMElement();
});
