import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetButton from '../../../../public/components/buttons/reset';

it('renders Reset and calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ResetButton onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Reset' }));

    expect(onClick).toHaveBeenCalledOnce();
});
