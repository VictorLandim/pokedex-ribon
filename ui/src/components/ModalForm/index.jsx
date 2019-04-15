import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './modalStyles.scss';
import './styles.scss';
import { submitMonsterCreateAction, submitMonsterEditAction, modalCloseAction } from '../../actions';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '0',
        borderRadius: '20px',
        maxWidth: '90%',
        boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.2)'
    }
};

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
            sprite: '',
            type_1: '',
            type_2: '',
            evolution_chain: ''
        };

        this.closeModal = this.closeModal.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.details) {
            const { id, name, number, sprite, type_1, type_2, evolution_chain } = props.details;

            this.setState({
                id,
                name,
                number,
                sprite,
                type_1,
                type_2: type_2 || '',
                evolution_chain: evolution_chain || ''
            });
        } else {
            this.setState({
                id: '',
                name: '',
                number: '',
                sprite: '',
                type_1: '',
                type_2: '',
                evolution_chain: ''
            });
        }
    }

    onInputChange(prop, value) {
        this.setState({
            [prop]: value
        });
    }

    onCreate() {
        const { name, number, sprite, type_1, type_2, evolution_chain } = this.state;

        if (!name) return alert('Type a name!');
        if (!number) return alert('Type a number!');
        if (!sprite) return alert('Type a sprite!');
        if (!type_1) return alert('Type a type 1!');

        const data = {
            ...this.state,
            type_2: type_2 ? type_2 : null,
            evolution_chain: evolution_chain ? evolution_chain : null
        };

        this.props.submitMonsterCreate(data);
    }

    onEdit() {
        const { name, number, sprite, type_1, type_2, evolution_chain } = this.state;

        if (!name) return alert('Type a name!');
        if (!number) return alert('Type a number!');
        if (!sprite) return alert('Type a sprite!');
        if (!type_1) return alert('Type a type 1!');

        const data = {
            ...this.state,
            type_2: type_2 ? type_2 : null,
            evolution_chain: evolution_chain ? evolution_chain : null
        };

        this.props.submitMonsterEdit(data);
    }

    renderButton() {
        const { isModalCreating } = this.props;

        if (isModalCreating)
            return (
                <div className="form-modal__button form-modal__button--green" onClick={this.onCreate}>
                    Create
                </div>
            );
        return (
            <div className="form-modal__button form-modal__button--blue" onClick={this.onEdit}>
                Edit
            </div>
        );
    }

    closeModal() {
        const { closeModal } = this.props;
        closeModal();
    }

    render() {
        const { isModalVisible, isModalCreating } = this.props;
        const { name, sprite, number, type_1, type_2, evolution_chain } = this.state;
        const header = isModalCreating ? 'Add new pokémon' : 'Edit pokémon';

        return (
            <Modal
                isOpen={isModalVisible}
                style={modalStyles}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                onRequestClose={this.closeModal}
                ariaHideApp={false}
            >
                <div className="form-modal">
                    <div className="form-modal__header">{header}</div>
                    <div className="form-modal__body">
                        <div className="form-modal__label">Name</div>
                        <input
                            type="text"
                            value={name}
                            className="form-modal__input"
                            onChange={e => this.onInputChange('name', e.target.value)}
                        />
                        <div className="form-modal__label">Number</div>
                        <input
                            type="text"
                            value={number}
                            className="form-modal__input"
                            onChange={e => this.onInputChange('number', e.target.value)}
                        />
                        <div className="form-modal__label">Sprite URL</div>
                        <input
                            type="text"
                            value={sprite}
                            className="form-modal__input"
                            onChange={e => this.onInputChange('sprite', e.target.value)}
                        />
                        <div className="form-modal__label">Type 1</div>
                        <input
                            type="text"
                            value={type_1}
                            className="form-modal__input"
                            onChange={e => this.onInputChange('type_1', e.target.value)}
                        />
                        <div className="form-modal__label">Type 2 (if exists)</div>
                        <input
                            type="text"
                            value={type_2}
                            className="form-modal__input"
                            onChange={e => this.onInputChange('type_2', e.target.value)}
                        />
                        <div className="form-modal__label">Evolution Chain (if exists)</div>
                        <input
                            type="text"
                            value={evolution_chain}
                            className="form-modal__input"
                            onChange={e => this.onInputChange('evolution_chain', e.target.value)}
                        />
                        {this.renderButton()}
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ({ monster }) => ({
    details: monster.details,
    isModalVisible: monster.isModalVisible,
    isModalCreating: monster.isModalCreating
});

const mapDispatchToProps = dispatch => ({
    submitMonsterCreate: monster => dispatch(submitMonsterCreateAction(monster)),
    submitMonsterEdit: monster => dispatch(submitMonsterEditAction(monster)),
    closeModal: () => dispatch(modalCloseAction())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalForm);
