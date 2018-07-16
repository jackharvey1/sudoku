import React from 'react';
import ResetButton from '../../../../public/components/buttons/reset';
import Renderer from 'react-test-renderer';

describe('Reset button', () => {
    it('renders as intended', () => {
        const testRenderer = Renderer.create(
            <ResetButton onClick={() => null} />
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
});
