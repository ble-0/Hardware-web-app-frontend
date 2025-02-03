
import { render, screen } from '@testing-library/react';
import App from '../temp-app/src/App';

test('renders header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Hardware Web App/i);
    expect(headerElement).toBeInTheDocument();
});