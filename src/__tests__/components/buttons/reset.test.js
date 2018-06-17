import React from 'react';
import ResetButton from '../../../components/buttons/reset';
import Renderer from 'react-test-renderer';

describe('Button provider', () => {
    it('renders as intended', () => {
        const testRenderer = Renderer.create(
            <ResetButton onClick={() => null} />
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
});
