import customPropTypes from '../../public/custom-prop-types';

it('returns null when a number', () => {
    expect(customPropTypes.numberOrNull({ testProp: 1 }, 'testProp')).toBe(null);
});

it('returns null when null', () => {
    expect(customPropTypes.numberOrNull({ testProp: null }, 'testProp')).toBe(null);
});

it('returns an error when not a number or null', () => {
    expect(customPropTypes.numberOrNull({ testProp: 'hello'}, 'testProp')).toBeInstanceOf(Error);
});
