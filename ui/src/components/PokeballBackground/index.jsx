import React, { Component } from 'react';
import styles from './styles.css';

class PokeballBackground extends Component {
    state = {
        rotation: '0deg'
    };
    handleScroll() {
        const percent =
            ((document.documentElement.scrollTop + document.body.scrollTop) /
                (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
            100;

        this.setState({
            rotation: `${percent * 3.6}deg`
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    render() {
        return (
            <div className="pokeball-bg" style={{ transform: `rotate(${this.state.rotation})` }}>
                <div className="pokeball-bg__line" />
                <div className="pokeball-bg__center" />
            </div>
        );
    }
}

export default PokeballBackground;
