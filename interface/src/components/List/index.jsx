import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import ListItem from '../ListItem';
import PokeballLoader from '../PokeballLoader';
import { fetchMonstersAction, fetchMonsterDetailsAction, clearSelectedMonsterAction } from '../../actions';
import './styles.scss';

class List extends Component {
    constructor(props) {
        super(props);

        this.onPokemonSearch = this.onPokemonSearch.bind(this);
        this.onListItemClick = this.onListItemClick.bind(this);
        this.onAdd = this.onAdd.bind(this);

        this.state = {
            search: ''
        };
    }
    componentWillMount() {
        const { fetchMonsters } = this.props;
        fetchMonsters();
    }

    onPokemonSearch(e) {
        this.setState({ search: e.target.value });
    }

    onListItemClick(number) {
        const { fetchMonsterDetails, details, clearSelectedMonster } = this.props;

        if (details && details.number === number) return clearSelectedMonster();
        fetchMonsterDetails(number);
    }

    onAdd() {
        alert('hello');
    }

    renderPokemonList() {
        const { monsters, details, isLoadingMonsters } = this.props;
        const { search } = this.state;
        if (isLoadingMonsters) return <PokeballLoader />;

        return monsters
            .filter(p => {
                if (isNaN(search)) {
                    return p.name.includes(search);
                }
                return p.number.toString().includes(search);
            })
            .map((e, i) => (
                <ListItem
                    {...e}
                    selected={details ? details.number === e.number : false}
                    key={i}
                    onClick={() => this.onListItemClick(e.number)}
                />
            ));
    }

    render() {
        const { monsters } = this.props;

        return (
            <div className="list">
                <div className="list__top">
                    <h1 className="list__heading">{`${monsters.length || 0} pokémon captured`}</h1>
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

const mapStateToProps = ({ monster }) => ({
    monsters: monster.list,
    details: monster.details,
    isLoadingMonsters: monster.istLoadingList
});

const mapDispatchToProps = dispatch => ({
    fetchMonsters: () => dispatch(fetchMonstersAction()),
    fetchMonsterDetails: number => dispatch(fetchMonsterDetailsAction(number)),
    clearSelectedMonster: () => dispatch(clearSelectedMonsterAction())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
