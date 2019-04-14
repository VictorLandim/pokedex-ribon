import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PokeballLoader from '../PokeballLoader';
import { FaTrash, FaPen } from 'react-icons/fa';
import { TYPE_COLOR_MAP, capitalizeFirst } from '../../util';
import './styles.scss';

class Details extends Component {
    static propTypes = {
        details: PropTypes.shape
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onEdit() {}

    onDelete() {}

    renderType = t =>
        t && (
            <div className="details__type" style={{ backgroundColor: TYPE_COLOR_MAP[t] || TYPE_COLOR_MAP['other'] }}>
                {capitalizeFirst(t)}
            </div>
        );

    renderDetails() {
        const { details } = this.props;
        if (!details) return <div className="details__empty">No pokémon data</div>;

        const { name, number, sprite, type_1, type_2, evolution_chain } = details;

        //hex alpha
        const ALPHA = '66';

        let spriteBg = `linear-gradient(to bottom, ${TYPE_COLOR_MAP[type_1]}${ALPHA}, ${
            TYPE_COLOR_MAP[type_1]
        }${ALPHA})`;

        console.log(spriteBg);
        if (type_2) {
            spriteBg = `linear-gradient(to bottom, ${TYPE_COLOR_MAP[type_1]}${ALPHA}, ${
                TYPE_COLOR_MAP[type_2]
            }${ALPHA})`;
        }

        return (
            <div className="details__content">
                <div className="details__top">
                    <div className="details__header">
                        <div className="details__button details__button--edit" onClick={this.onDelete}>
                            <FaTrash />
                        </div>
                        <div className="details__number">{`# ${number}`}</div>
                        <div className="details__button details__button--new" onClick={this.onEdit}>
                            <FaPen />
                        </div>
                    </div>
                    <div className="details__name">{capitalizeFirst(name)}</div>
                    <div className="details__sprite-container" style={{ background: spriteBg }}>
                        <img src={sprite} className="details__sprite" />
                    </div>
                    <div className="details__type-container">
                        {this.renderType(type_1)}
                        {this.renderType(type_2)}
                    </div>
                    <div className="details__evolution-container" />
                </div>
            </div>
        );
    }

    renderContent() {
        const { isLoadingDetails } = this.props;

        if (isLoadingDetails) return <PokeballLoader />;

        return this.renderDetails();
    }

    render() {
        return (
            <div className="details">
                <div className="details__title">Pokémon details</div>
                <div className="details__container">{this.renderContent()}</div>
            </div>
        );
    }
}

const mapStateToProps = ({ monster }) => ({
    details: monster.details,
    isLoadingDetails: monster.isLoadingDetails
});

export default connect(mapStateToProps)(Details);
