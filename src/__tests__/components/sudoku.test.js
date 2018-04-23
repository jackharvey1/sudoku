import React from 'react';
import Sudoku from '../../components/sudoku';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount } from 'enzyme';
import { emptySudoku } from '../sudokus.json';

it('renders the Sudoku component as intended', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Sudoku grid={emptySudoku} />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});

it('casts to a number and inputs into the correct square', () => {
    const sudoku = mount(<Sudoku grid={emptySudoku} />);

    sudoku.setState({
        selectedBox: 0,
        selectedSquare: 0
    });

    const event = new KeyboardEvent('keydown', { key: '1' });
    window.dispatchEvent(event);
    sudoku.update();

    expect(sudoku.state().values[0][0]).toEqual(1);
});

it('does not allow other inputs', () => {
    const sudoku = mount(<Sudoku grid={emptySudoku} />);

    sudoku.setState({
        selectedBox: 5,
        selectedSquare: 5
    });

    const event = new KeyboardEvent('keydown', { key: 'x' });
    window.dispatchEvent(event);
    sudoku.update();

    expect(sudoku.state().values[5][5]).toEqual('');
});

it('highlights a square when clicked', () => {
    const sudoku = mount(<Sudoku grid={emptySudoku} />);
    const square = sudoku.find('.Square').at(0);

    square.simulate('click');

    expect(square.render().hasClass('Square--selected')).toBe(true);
});

describe('Using the arrow keys', () => {
    let sudoku;

    describe('successful movements', () => {
        beforeEach(() => {
            sudoku = mount(<Sudoku grid={emptySudoku} />);
            sudoku.setState({
                selectedBox: 0,
                selectedSquare: 4
            });
        });

        it('selects the above square successfully', () => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
            window.dispatchEvent(event);

            expect(sudoku.state()).toHaveProperty('selectedSquare', 1);
        });

        it('selects the right-hand side square successfully', () => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
            window.dispatchEvent(event);

            expect(sudoku.state()).toHaveProperty('selectedSquare', 5);
        });

        it('selects the left-hand side square successfully', () => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
            window.dispatchEvent(event);

            expect(sudoku.state()).toHaveProperty('selectedSquare', 3);
        });

        it('selects the below square successfully', () => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
            window.dispatchEvent(event);

            expect(sudoku.state()).toHaveProperty('selectedSquare', 7);
        });
    });

    describe('when against the edges', () => {
        beforeEach(() => {
            sudoku = mount(<Sudoku grid={emptySudoku} />);
        });

        it('does not move above the top-most row', () => {
            sudoku.setState({
                selectedBox: 0,
                selectedSquare: 0
            });

            const targetSquare = sudoku.find('.Square').at(0);
            const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
            window.dispatchEvent(event);

            expect(targetSquare.render().hasClass('Square--selected')).toBe(true);
        });

        it('does not move beyond the right-most column', () => {
            sudoku.setState({
                selectedBox: 2,
                selectedSquare: 2
            });

            const targetSquare = sudoku.find('.Square').at(20);
            const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
            window.dispatchEvent(event);

            expect(targetSquare.render().hasClass('Square--selected')).toBe(true);
        });

        it('does not move beyond the left-most column', () => {
            sudoku.setState({
                selectedBox: 0,
                selectedSquare: 0
            });

            const targetSquare = sudoku.find('.Square').at(0);
            const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
            window.dispatchEvent(event);

            expect(targetSquare.render().hasClass('Square--selected')).toBe(true);
        });

        it('does not move below the bottom-most row', () => {
            sudoku.setState({
                selectedBox: 6,
                selectedSquare: 6
            });

            const targetSquare = sudoku.find('.Square').at(60);
            const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
            window.dispatchEvent(event);

            expect(targetSquare.render().hasClass('Square--selected')).toBe(true);
        });

        it('does not move below the bottom-most row', () => {
            sudoku.setState({
                selectedBox: 0,
                selectedSquare: 0
            });

            const targetSquare = sudoku.find('.Square').at(0);
            const event = new KeyboardEvent('keydown', { key: 'Space' });
            window.dispatchEvent(event);

            expect(targetSquare.render().hasClass('Square--selected')).toBe(true);
        });
    });
});
