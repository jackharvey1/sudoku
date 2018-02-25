import React from 'react';
import Sudoku from '../../components/sudoku';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount } from 'enzyme';

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

it('renders the Sudoku component as intended', () => {
    renderer.render(<Sudoku />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});

it('inputs into the correct square', () => {
    const sudoku = mount(<Sudoku />);
    const box = sudoku.find('Box').at(0);
    const square = sudoku.find('.Square').at(0);
    const event = { target: { value: '1' } };
    square.simulate('change', event);
    sudoku.update();
    expect(box.props().values[0]).toEqual('1');
});
