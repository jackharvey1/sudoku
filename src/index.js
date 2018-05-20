import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'react-emotion';

import App from './components/app';

injectGlobal`
    * {
        margin: 0;
    }
`;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
