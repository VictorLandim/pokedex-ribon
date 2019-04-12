import React, { Component } from 'react';
import styles from './styles.css';
import { FaPen, FaTrash } from 'react-icons/fa';

class PokemonCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const { number, name, sprite, onEdit, onDelete, onDetails } = this.props;
        const { expanded } = this.state;

        return (
            <div className="pokemon-card" onClick={this.onClick} style={{ width: expanded ? '90%' : '80%' }}>
                <div className="pokemon-card__sprite-container">
                    <img className="pokemon-card__sprite" src={sprite} alt={`Pokemon ${name} Sprite`} />
                </div>

                <div className="pokemon-card__name">{`#${number} ${name}`}</div>

                <div className="pokemon-card__button-container">
                    <div className="pokemon-card__button pokemon-card__button--new" onClick={onEdit}>
                        <FaPen />
                    </div>
                    <div className="pokemon-card__button pokemon-card__button--edit" onClick={onDelete}>
                        <FaTrash />
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonCard;
