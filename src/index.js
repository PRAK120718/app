import React from 'react';
import ReactDOM from 'react-dom';
//import Routes from './routes.js';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';

import './css/app.css'


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
