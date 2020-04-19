import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
/* import rootReducer from './reducers/index'

let store = createStore(rootReducer) */

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
