import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RootWindowManager, { WINDOW_ROOT_NAME } from './lib/RootWindowManager';
import DataWindowManager  from './lib/DataWindowManager';
import * as serviceWorker from './serviceWorker';

declare global {
  interface Window {
    windowManager: any;
    lastWindowData: any;
  }
}

console.log(RootWindowManager);

if (window.name === '') window.name = WINDOW_ROOT_NAME;
if (window.name === WINDOW_ROOT_NAME) {
  console.log("Starting as root");
  (window.windowManager = new RootWindowManager()).run();
  window.windowManager.recoverTabs();
} else {
  console.log("Starting as data");
  (window.windowManager = new DataWindowManager()).run();
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
