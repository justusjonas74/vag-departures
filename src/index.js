/* esversion: 6*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
// import registerServiceWorker from './registerServiceWorker';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // TODO: EXCLUDE ALL UNNECESSARY STUFF!


ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();