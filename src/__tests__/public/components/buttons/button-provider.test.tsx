import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonProvider from '../../../../public/components/buttons/button-provider';

it('renders the label and calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ButtonProvider
        onClick={onClick}
        icon={() => <svg data-testid="icon" />}
        text="Test"
    />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Test' }));

    expect(onClick).toHaveBeenCalledOnce();
});
