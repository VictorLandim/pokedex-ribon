import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokeballLoader from '../PokeballLoader';
import './styles.scss';

class Details extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="details">
                <div className="details__title">Pokémon details</div>
                <div className="details__container">
                    <PokeballLoader />
                </div>
            </div>
        );
    }
}

{
    /* <div className="list-item__button-container">
<div className="list-item__button list-item__button--new" onClick={onEdit}>
    <FaPen />
</div>
<div className="list-item__button list-item__button--edit" onClick={onDelete}>
    <FaTrash />
</div>
</div> 



    &__button-container {
        flex: 0 0 20%;
        display: flex;
        align-self: stretch;
        justify-content: space-around;
        align-items: flex-end;
        flex-direction: column;
    }

    &__button {
        background-color: #fff;
        padding: 14px;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }
    s
*/
}

export default Details;
