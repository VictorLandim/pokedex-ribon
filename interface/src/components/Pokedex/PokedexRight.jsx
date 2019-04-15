import React from 'react';
import List from '../List';
import './styles.scss';

export default () => (
    <div className="pokedex__right">
        <div className="pokedex__right-header">
            <div className="pokedex__leds">
                <div className="pokedex__led">
                    <div className="pokedex__led-inner" />
                    <div className="pokedex__led-outer" />
                </div>
                <div className="pokedex__led">
                    <div className="pokedex__led-inner" />
                    <div className="pokedex__led-outer" />
                </div>
            </div>
            <div className="pokedex__right-title">Ribon Pokédex!</div>
        </div>
        <div className="pokedex__right-body">
            <List />
        </div>
    </div>
);
