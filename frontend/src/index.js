import React from 'react';
import { render } from 'react-dom';
import Home from './components/Home';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Home />
    </Provider>,
    document.getElementById('root')
);
