import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PokeballLoader from '../PokeballLoader';
import { FaTrash, FaPen, FaArrowRight } from 'react-icons/fa';
import { submitMonsterDeleteAction, showMonsterEditAction } from '../../actions';
import { TYPE_COLOR_MAP, capitalizeFirst } from '../../util';
import './styles.scss';

class Details extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onEdit() {
        this.props.showMonsterEdit();
    }

    onDelete() {
        this.props.submitMonsterDelete();
    }

    renderType = t =>
        t && (
            <div className="details__type" style={{ backgroundColor: TYPE_COLOR_MAP[t] || TYPE_COLOR_MAP['other'] }}>
                {capitalizeFirst(t)}
            </div>
        );

    renderEvolution() {
        try {
            const { details } = this.props;
            const evolutions = JSON.parse(details.evolution_chain);

            if (evolutions.length === 0) {
                return (
                    <div className="details__evolution-message">
                        This pokémon is not known <br /> to have an evolution.
                    </div>
                );
            }

            return evolutions.map(e => (
                <>
                    <div className="details__evolution-title">Evolution</div>
                    <div className="details__evolution-row">
                        <div className="details__evolution-block">
                            <img src={details.sprite} className="details__evolution-image" />
                            <div className="details__evolution-name">{capitalizeFirst(details.name)}</div>
                        </div>
                        <FaArrowRight />
                        <div className="details__evolution-block">
                            <img src={e.sprite} className="details__evolution-image" />
                            <div className="details__evolution-name">{capitalizeFirst(e.name)}</div>
                        </div>
                    </div>
                </>
            ));
        } catch (e) {
            // malformed string
            return <div className="details__evolution-message">Malformed evolution field.</div>;
        }
    }

    renderDetails() {
        const { details, submitMonsterDelete, showMonsterEdit } = this.props;
        if (!details) return <div className="details__empty">No pokémon data</div>;

        const { id, name, number, sprite, type_1, type_2, evolution_chain } = details;

        //hex alpha
        const ALPHA = '99';

        let spriteBg = `linear-gradient(to bottom, ${TYPE_COLOR_MAP[type_1]}${ALPHA}, ${
            TYPE_COLOR_MAP[type_1]
        }${ALPHA})`;

        if (type_2) {
            spriteBg = `linear-gradient(to bottom, ${TYPE_COLOR_MAP[type_1]}${ALPHA}, ${TYPE_COLOR_MAP[type_2] ||
                TYPE_COLOR_MAP['other']}${ALPHA})`;
        }

        return (
            <div className="details__content">
                <div className="details__top">
                    <div className="details__header">
                        <div className="details__button" onClick={() => submitMonsterDelete(id)}>
                            <FaTrash />
                        </div>
                        <div className="details__number">{`# ${number}`}</div>
                        <div className="details__button" onClick={() => showMonsterEdit()}>
                            <FaPen />
                        </div>
                    </div>
                    <div className="details__body">
                        <div className="details__info">
                            <div className="details__name">{capitalizeFirst(name)}</div>
                            <div className="details__sprite-container" style={{ background: spriteBg }}>
                                <img src={sprite} className="details__sprite" />
                            </div>
                            <div className="details__type-container">
                                {this.renderType(type_1)}
                                {this.renderType(type_2)}
                            </div>
                        </div>
                        <div className="details__evolution-container">{this.renderEvolution()}</div>
                    </div>
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

const mapDispatchToProps = dispatch => ({
    submitMonsterDelete: id => dispatch(submitMonsterDeleteAction(id)),
    showMonsterEdit: () => dispatch(showMonsterEditAction())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);
