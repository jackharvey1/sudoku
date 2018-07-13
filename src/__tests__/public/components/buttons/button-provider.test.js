import React from 'react';
import ButtonProvider from '../../../../public/components/buttons/button-provider';
import Renderer from 'react-test-renderer';

describe('Button provider', () => {
    it('renders as intended', () => {
        const testRenderer = Renderer.create(
            <ButtonProvider
                onClick={() => null}
                icon={() => null}
                text={"Test"}
            />
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
});
