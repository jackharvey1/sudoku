import React from 'react';
import Box from '../../../public/components/box';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

let renderer;

beforeEach(() => {
    renderer = new ShallowRenderer();
});

it('renders the Box component as intended', () => {
    renderer.render(<Box
        box={0}
        onClick={() => null}
        values={["1", "", "", "", "", "", "", "", ""]}
        isUnderCheck={false}
        selectedBox={0}
        selectedSquare={0}
        lockedCells={[[0, 1]]}
        solution={[[], [], [], [], [], [], [], [], []]}
    />);
    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
});

describe('Predicates for squares', () => {
    it('Marks as locked when cell is specified in locked cells', () => {
        const wrapper = shallow(<Box
            box={0}
            onClick={() => null}
            values={["1", "", "", "", "", "", "", "", ""]}
            isUnderCheck={false}
            selectedBox={0}
            selectedSquare={0}
            lockedCells={[0, 1]}
            solution={[[], [], [], [], [], [], [], [], []]}
        />);
        expect(wrapper.instance().isLockedSquare(1)).toBe(true);
    });

    it('Marks as selected when box and square match selected box and square', () => {
        const wrapper = shallow(<Box
            box={0}
            onClick={() => null}
            values={["1", "", "", "", "", "", "", "", ""]}
            isUnderCheck={false}
            selectedBox={0}
            selectedSquare={0}
            lockedCells={[0, 1]}
            solution={[[], [], [], [], [], [], [], [], []]}
        />);
        expect(wrapper.instance().isSelectedSquare(0)).toBe(true);
    });

    describe('Marking as relevant', () => {
        it('Marks as relevant when on the same row', () => {
            const wrapper = shallow(<Box
                box={0}
                onClick={() => null}
                values={["1", "", "", "", "", "", "", "", ""]}
                isUnderCheck={false}
                selectedBox={1}
                selectedSquare={5}
                lockedCells={[[0, 1]]}
                solution={[[], [], [], [], [], [], [], [], []]}
            />);
            expect(wrapper.instance().isRelevantSquare(4)).toBe(true);
        });

        it('Marks as relevant when on the same column', () => {
            const wrapper = shallow(<Box
                box={0}
                onClick={() => null}
                values={["1", "", "", "", "", "", "", "", ""]}
                isUnderCheck={false}
                selectedBox={3}
                selectedSquare={1}
                lockedCells={[0, 1]}
                solution={[[], [], [], [], [], [], [], [], []]}
            />);
            expect(wrapper.instance().isRelevantSquare(7)).toBe(true);
        });

        it('Marks as relevant when in the same box', () => {
            const wrapper = shallow(<Box
                box={0}
                onClick={() => null}
                values={["1", "", "", "", "", "", "", "", ""]}
                isUnderCheck={false}
                selectedBox={0}
                selectedSquare={5}
                lockedCells={[0, 1]}
                solution={[[], [], [], [], [], [], [], [], []]}
            />);
            expect(wrapper.instance().isRelevantSquare(8)).toBe(true);
        });
    });
});
