import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import ListItem from '../ListItem';
import './styles.scss';

class List extends Component {
    constructor(props) {
        super(props);

        this.onPokemonSearch = this.onPokemonSearch.bind(this);
        this.onAdd = this.onAdd.bind(this);

        this.state = {
            pokemon: [],
            search: ''
        };
    }
    componentDidMount() {
        this.loadPokemon();
    }

    onPokemonSearch(e) {
        this.setState({ search: e.target.value });
    }

    onAdd() {
        alert('hello');
    }

    async loadPokemon() {
        const pokemonStream = await fetch(`http://localhost:3000/api/monsters`);
        const { data } = await pokemonStream.json();

        this.setState({ pokemon: data });
    }

    renderPokemonList = () =>
        this.state.pokemon
            .filter(p => {
                const { search } = this.state;
                if (isNaN(search)) {
                    return p.name.includes(search);
                }
                return p.number.toString().includes(search);
            })
            .map((e, i) => <ListItem {...e} key={i} onClick={this.props.onListItemClick} />);

    render() {
        return (
            <div className="list">
                <div className="list__top">
                    <h1 className="list__heading">{`${this.state.pokemon.length} pokémon captured`}</h1>
                    <div className="list__button">
                        <FaPlus />{' '}
                        <div className="list__button-text" onClick={this.onAdd}>
                            Add new pokemon
                        </div>
                    </div>
                </div>
                <div className="list__container">
                    <input
                        type="text"
                        className="list__search"
                        placeholder="Search for a pokémon"
                        onChange={this.onPokemonSearch}
                    />
                    <div className="list__content">{this.renderPokemonList()}</div>
                </div>
            </div>
        );
    }
}

export default List;
