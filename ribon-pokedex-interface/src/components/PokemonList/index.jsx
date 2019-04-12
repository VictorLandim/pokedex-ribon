import React, { Component } from 'react';
import PokemonCard from '../PokemonCard';
import styles from './styles.css';

class PokemonList extends Component {
    constructor(props) {
        super(props);

        this.loadPokemon();
    }

    state = {
        pokemon: []
    };

    async loadPokemon() {
        const pokemonNumbers = [];
        for (let i = 0; i < 10; i++) {
            pokemonNumbers.push({
                number: Math.floor(Math.random() * 151 + 1)
            });
        }

        const pokemon = [];

        for (let e of pokemonNumbers) {
            const p = await this.loadPokemonData(e);
            pokemon.push(p);
        }

        this.setState({ pokemon });
    }

    async loadPokemonData(e) {
        const pokemonStream = await fetch(`https://pokeapi.co/api/v2/pokemon/${e.number}/`);
        const pokemonInfo = await pokemonStream.json();

        return {
            ...e,
            name: pokemonInfo.species.name,
            sprite: pokemonInfo.sprites.front_default
        };
    }

    renderPokemonList = () => this.state.pokemon.map((e, i) => <PokemonCard {...e} key={i} />);

    render() {
        return (
            <div className="pokemon-list">
                <h1 className="pokemon-list__heading">{`${this.state.pokemon.length} pokémon captured`}</h1>
                {this.renderPokemonList()}
            </div>
        );
    }
}

export default PokemonList;
