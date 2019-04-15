import React from 'react';
import PokedexLeft from './PokedexLeft';
import PokedexRight from './PokedexRight';
import ModalForm from '../ModalForm';
import './styles.scss';

export default () => (
    <div className="pokedex">
        <PokedexLeft />
        <PokedexRight />
        <ModalForm />
    </div>
);
