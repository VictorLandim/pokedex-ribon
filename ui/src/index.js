import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';
import Pokedex from './components/Pokedex';
import './components/Pokedex/reset.scss';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middleware.push(logger);

const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <Pokedex />
    </Provider>,
    document.getElementById('root')
);
