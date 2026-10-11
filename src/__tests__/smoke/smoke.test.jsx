import { render, screen } from '@testing-library/react';
import App from '../../public/components/app';

it('renders a generated board', () => {
    render(<App />);

    expect(screen.getByText(/Difficulty:/)).toBeInTheDocument();
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(81);
});
