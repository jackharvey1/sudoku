import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'react-emotion';

import App from './public/components/app';

//eslint-disable-next-line no-unused-expressions
injectGlobal`
    * {
        margin: 0;
    }
`;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
