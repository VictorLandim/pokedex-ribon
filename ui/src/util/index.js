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
    other: '#37474f'
};
const MONSTER_API_URL = 'http://localhost:3000/api/monsters';
const capitalizeFirst = s => s.charAt(0).toUpperCase() + s.substring(1);

export { TYPE_COLOR_MAP, MONSTER_API_URL, capitalizeFirst };
