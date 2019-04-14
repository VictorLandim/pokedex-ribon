import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import Pokedex from './components/Pokedex';
import './components/Pokedex/reset.scss';

render(
    <Provider store={createStore(rootReducer)}>
        <Pokedex />
    </Provider>,
    document.getElementById('root')
);
