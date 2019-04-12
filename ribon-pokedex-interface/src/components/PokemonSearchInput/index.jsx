import React from 'react';
import styles from './styles.css';

export default ({ onChange }) => (
    <input type="text" className="pokemon-search" placeholder="Search for pokémon" onChange={onChange} />
);
