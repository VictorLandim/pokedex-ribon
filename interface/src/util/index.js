const TYPE_COLOR_MAP = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    other: '#f3f3f3'
};

const TYPE_COLOR_MAP_2 = {
    normal: '#A8A878',
    fire: '#F08030',
    fighting: '#C03028',
    water: '#6890F0',
    grass: '#78C850',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    dragon: '#7038F8',
    ghost: '#705898',
    dark: '#705848',
    fairy: '#EE99AC',
    steel: '#B8B8D0',
    psychic: '#F85888',
    ice: '#98D8D8',
    flying: '#A890F0'
};

const MONSTER_API_URL = 'http://localhost:3000/api/monsters/';

const capitalizeFirst = s => s.charAt(0).toUpperCase() + s.substring(1);

export { TYPE_COLOR_MAP, MONSTER_API_URL, capitalizeFirst };
