import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RootWindowManager from './lib/RootWindowManager';
import * as serviceWorker from './serviceWorker';

declare global {
    interface Window {
      windowManager: any;
      lastWindowData: any;
    }
}

console.log(RootWindowManager);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
