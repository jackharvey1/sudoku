import React from 'react';
import App from '../../components/app';
import Renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { emptySudoku, solvedSudoku } from '../sudokus.json';
import { generatePuzzle } from '../../public/js/generator';
import { deepClone } from '../../public/js/utils/array.js';

jest.mock('../../public/js/generator');

generatePuzzle.mockImplementation(() => ({
    sudoku: emptySudoku,
    solution: deepClone(solvedSudoku),
    difficulty: Infinity
}));

it('renders the App component as intended', () => {
    const testRenderer = Renderer.create(<App />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
});

it('resets to a valid state', () => {
    const app = mount(<App />);
    app.instance().reset();
    app.update();
    expect(app.state()).toEqual({
        sudoku: emptySudoku,
        solution: deepClone(solvedSudoku),
        difficulty: Infinity,
        lockedCells: [],
        selectedBox: null,
        selectedSquare: null
    });
});

it('returns null when there\'s no sudoku set in the state', () => {
    const testRenderer = Renderer.create(<App />);
    testRenderer.getInstance().setState({ sudoku: null });
    expect(testRenderer.toJSON()).toBe(null);
});

it('displays the win message when the sudoku is solved', () => {
    const app = mount(<App />);
    app.setState({
        sudoku: deepClone(solvedSudoku)
    });
    expect(app.find('WinMessage')).toHaveLength(1);
});

it('casts to a number and inputs into the correct square', () => {
    const app = mount(<App />);

    app.setState({
        selectedBox: 0,
        selectedSquare: 0
    });

    const event = new KeyboardEvent('keydown', { key: '1' });
    window.dispatchEvent(event);
    app.update();

    expect(app.state().sudoku[0][0]).toEqual(1);
});

it('deletes a key when backspace is pressed', () => {
    const app = mount(<App />);

    app.setState({
        sudoku: deepClone(solvedSudoku),
        lockedCells: [],
        selectedBox: 0,
        selectedSquare: 0
    });

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    window.dispatchEvent(event);
    app.update();

    expect(app.state().sudoku[0][0]).toEqual('');
});

it('does not allow other inputs', () => {
    const app = mount(<App />);

    app.setState({
        selectedBox: 5,
        selectedSquare: 5
    });

    const event = new KeyboardEvent('keydown', { key: 'x' });
    window.dispatchEvent(event);
    app.update();

    expect(app.state().sudoku[5][5]).toEqual('');
});

it('highlights a square when clicked', () => {
    const app = mount(<App />);

    app.find('Square').at(0).simulate('click');

    expect(app.find('Square').at(0).props().isSelected).toBe(true);
});

it('does not allow input into locked cells', () => {
    const app = mount(<App />);

    app.setState({
        selectedBox: 0,
        selectedSquare: 0,
        sudoku: deepClone(solvedSudoku),
        lockedCells: [[0, 0]]
    });

    const currentCellValue = solvedSudoku[0][0];
    const event = new KeyboardEvent('keydown', { key: '1' });
    window.dispatchEvent(event);
    app.update();

    expect(app.state().sudoku[0][0]).toEqual(currentCellValue);
});

describe('Using the arrow keys', () => {
    let app;

    describe('successful movements', () => {
        beforeEach(() => {
            app = mount(<App />);
            app.setState({
                selectedBox: 0,
                selectedSquare: 4
            });
        });

        it('selects the above square successfully', () => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
            window.dispatchEvent(event);

            expect(app.state()).toHaveProperty('selectedSquare', 1);
        });

        it('selects the right-hand side square successfully', () => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
            window.dispatchEvent(event);

            expect(app.state()).toHaveProperty('selectedSquare', 5);
        });

        it('selects the left-hand side square successfully', () => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
            window.dispatchEvent(event);

            expect(app.state()).toHaveProperty('selectedSquare', 3);
        });

        it('selects the below square successfully', () => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
            window.dispatchEvent(event);

            expect(app.state()).toHaveProperty('selectedSquare', 7);
        });
    });

    describe('when against the edges', () => {
        beforeEach(() => {
            app = mount(<App />);
        });

        it('does not move above the top-most row', () => {
            app.setState({
                selectedBox: 0,
                selectedSquare: 0
            });

            const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
            window.dispatchEvent(event);

            expect(app.find('Square').at(0).props().isSelected).toBe(true);
        });

        it('does not move beyond the right-most column', () => {
            app.setState({
                selectedBox: 2,
                selectedSquare: 2
            });

            const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
            window.dispatchEvent(event);

            expect(app.find('Square').at(20).props().isSelected).toBe(true);
        });

        it('does not move beyond the left-most column', () => {
            app.setState({
                selectedBox: 0,
                selectedSquare: 0
            });

            const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
            window.dispatchEvent(event);

            expect(app.find('Square').at(0).props().isSelected).toBe(true);
        });

        it('does not move below the bottom-most row', () => {
            app.setState({
                selectedBox: 6,
                selectedSquare: 6
            });

            const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
            window.dispatchEvent(event);

            expect(app.find('Square').at(60).props().isSelected).toBe(true);
        });

        it('does not move below the bottom-most row', () => {
            app.setState({
                selectedBox: 0,
                selectedSquare: 0
            });

            const event = new KeyboardEvent('keydown', { key: 'Space' });
            window.dispatchEvent(event);

            expect(app.find('Square').at(0).props().isSelected).toBe(true);
        });
    });
});
