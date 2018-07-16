import React from 'react';
import Square from '../../../public/components/square';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import solvedSudoku from '../../sudokus.json';

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

it('renders as expected in basic state', () => {
    renderer.render(<Square
        onClick={() => {}}
        box={0}
        square={0}
        value={1}
        isSelected={false}
        isLocked={false}
        isRelevant={false}
        isUnderCheck={false}
        isCorrect={true}
        solution={solvedSudoku}
    />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});

it('renders with bold text when locked', () => {
    const square = shallow(<Square
        onClick={() => {}}
        box={0}
        square={0}
        value={1}
        isSelected={false}
        isLocked={true}
        isRelevant={false}
        isUnderCheck={false}
        isCorrect={true}
        solution={solvedSudoku}
    />);
    expect(square).toMatchSnapshot();
});

it('renders with background when selected', () => {
    const square = shallow(<Square
        onClick={() => {}}
        box={0}
        square={0}
        value={1}
        isSelected={true}
        isLocked={false}
        isRelevant={false}
        isUnderCheck={false}
        isCorrect={true}
        solution={solvedSudoku}
    />);
    expect(square).toMatchSnapshot();
});

it('renders with a light background when relevant', () => {
    const square = shallow(<Square
        onClick={() => {}}
        box={0}
        square={0}
        value={1}
        isSelected={true}
        isLocked={false}
        isRelevant={true}
        isUnderCheck={false}
        isCorrect={true}
        solution={solvedSudoku}
    />);
    expect(square).toMatchSnapshot();
});

it('renders with a green background when under check and correct', () => {
    const square = shallow(<Square
        onClick={() => {}}
        box={0}
        square={0}
        value={1}
        isSelected={true}
        isLocked={false}
        isRelevant={true}
        isUnderCheck={true}
        isCorrect={true}
        solution={solvedSudoku}
    />);
    expect(square).toMatchSnapshot();
});

it('renders with a red background when under check and not correct', () => {
    const square = shallow(<Square
        onClick={() => {}}
        box={0}
        square={0}
        value={4}
        isSelected={true}
        isLocked={false}
        isRelevant={true}
        isUnderCheck={true}
        isCorrect={false}
        solution={solvedSudoku}
    />);
    expect(square).toMatchSnapshot();
});
