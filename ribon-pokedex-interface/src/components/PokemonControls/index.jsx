import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PokemonSearchInput from '../PokemonSearchInput';
import './styles.css';

export default ({ onInputChange }) => (
    <div className="pokemon-controls">
        <div className="pokemon-controls__button-container">
            <div className="pokemon-control__new-button">
                <FaPlus /> Add new pokémon
            </div>
        </div>
        <PokemonSearchInput onChange={onInputChange} />
    </div>
);
