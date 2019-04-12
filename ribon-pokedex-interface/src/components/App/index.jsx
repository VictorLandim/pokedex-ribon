import React, { Component } from 'react';
import PokeballBackground from '../PokeballBackground';
import PokemonList from '../PokemonList';
import PokemonControls from '../PokemonControls';
import './reset.css';
import './styles.css';

class App extends Component {
    onPokemonSearch(e) {
        console.log(e.target.value);
    }

    render() {
        return (
            <div className="App">
                <PokeballBackground />
                <div className="app-container">
                    <div className="heading">React Pokédex!</div>
                    <PokemonControls onInputChange={this.onPokemonSearch.bind(this)} />
                    <PokemonList />
                </div>
            </div>
        );
    }
}

export default App;
