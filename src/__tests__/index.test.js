import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';
jest.mock('react-dom', () => ({
    render: jest.fn()
}));

it('renders without crashing', () => {
    const div = document.createElement('div');
    const app = <App />;
    ReactDOM.render(app, div);

    expect(ReactDOM.render).toHaveBeenCalledWith(app, div);
});
