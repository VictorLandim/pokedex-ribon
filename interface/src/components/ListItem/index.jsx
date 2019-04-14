import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './styles.scss';

const ListItem = ({ number, name, sprite, onClick }) => (
    <div className="list-item" onClick={onClick}>
        <div className="list-item__bg" />
        <div className="list-item__content">
            <div className="list-item__sprite-container">
                <img className="list-item__sprite" src={sprite} alt={`Pokemon ${name} Sprite`} />
            </div>

            <div className="list-item__name">{`#${number} ${name.charAt(0).toUpperCase() + name.substring(1)}`}</div>
        </div>
    </div>
);

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    sprite: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
};

export default ListItem;
