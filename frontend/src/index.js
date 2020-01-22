import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

// const firebase = require('firebase');
//
// if (!firebase.apps.length) {
//     firebase.initializeApp({
//         apiKey: "AIzaSyCfYTijp5OAtzS0XGE7PTz3jAUK1W6slt4",
//         authDomain: "foodspace-807fc.firebaseapp.com",
//         projectId: "foodspace-807fc"
//     });
// }

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
