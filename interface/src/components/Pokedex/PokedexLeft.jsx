import React, { Component } from 'react';
import Details from '../Details';
import './styles.scss';

class PokedexLeft extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rotation: '0deg'
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const element = document.querySelector('.list__content');
        const scrollFactor = 5;
        const percent =
            ((element.scrollTop + document.body.scrollTop) / (element.scrollHeight - element.clientHeight)) * 100;

        this.setState({
            rotation: `${percent * scrollFactor * 3.6}deg`
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, true);
    }
    render() {
        return (
            <div className="pokedex__left">
                <div className="pokedex__left-header">
                    <div
                        className="pokedex__pokeball"
                        style={{ transform: `translateY(-50%) rotate(${this.state.rotation})` }}
                    >
                        <div className="pokedex__pokeball-line" />
                        <div className="pokedex__pokeball-center" />
                    </div>
                    <div className="pokedex__circle">
                        <div className="pokedex__circle-inner" />
                        <div className="pokedex__circle-outer" />
                    </div>
                </div>
                <div className="pokedex__left-body">
                    <Details />
                </div>
            </div>
        );
    }
}

export default PokedexLeft;
