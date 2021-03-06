import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import { reducers } from './Reducers/reducers';
import StateLoader from "./Reducers/stateloader.js";


const stateLoader = new StateLoader();

const store = createStore(reducers, stateLoader.loadState(), devToolsEnhancer({}));
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
