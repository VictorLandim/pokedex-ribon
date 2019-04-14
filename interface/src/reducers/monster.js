import {
    MONSTERS_FETCH,
    MONSTERS_RESULT,
    MONSTERS_ERROR,
    MONSTER_DETAILS_FETCH,
    MONSTER_DETAILS_RESULT,
    MONSTER_DETAILS_ERROR
} from '../types';

const INITIAL_STATE = {
    monsters: [],
    monsterDetails: {},
    isLoadingMonsters: false,
    isLoadingMonsterDetails: false,
    monstersError: null,
    monsterDetailsError: null
};

const monsterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MONSTERS_FETCH:
            return {
                ...state,
                isLoadingMonsters: true
            };
        case MONSTERS_RESULT:
            return {
                ...state,
                isLoadingMonsters: false,
                monsters: action.payload
            };
        case MONSTERS_ERROR:
            return {
                ...state,
                isLoadingMonsters: false,
                monstersError: action.payload
            };
        case MONSTER_DETAILS_FETCH:
            return {
                ...state,
                isLoadingMonsterDetails: true
            };
        case MONSTER_DETAILS_RESULT:
            return {
                ...state,
                isLoadingMonsterDetails: false,
                monsterDetails: action.payload
            };
        case MONSTER_DETAILS_ERROR:
            return {
                ...state,
                isLoadingMonsterDetails: false,
                monsterDetailsError: action.payload
            };
        default:
            return state;
    }
};

export default monsterReducer;
