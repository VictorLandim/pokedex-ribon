import React from 'react';
import List from '../List';
import './styles.scss';

export default () => (
    <div className="pokedex__right">
        <div className="pokedex__right-header">
            <div className="pokedex__right-leds">
                <div className="pokedex__right-header-led pokedex__right-header-led--1" />
                <div className="pokedex__right-header-led pokedex__right-header-led--2" />
            </div>
            <div className="pokedex__right-title">Ribon Pokédex!</div>
        </div>
        <div className="pokedex__right-body">
            <List />
        </div>
    </div>
);
