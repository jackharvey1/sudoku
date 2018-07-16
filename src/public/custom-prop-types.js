export default {
    numberOrNull: (props, propName, componentName) =>
        typeof props[propName] === 'number' || props[propName] === null
            ? null
            : new Error(`${componentName} only accepts null or string`)
};
