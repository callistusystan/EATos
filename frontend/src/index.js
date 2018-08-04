import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './RegisterServiceWorker';
import Root from './Root';
import './styles/index.css';
import './styles/fonts.css'

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
