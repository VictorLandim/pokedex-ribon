import {
    MONSTERS_FETCH,
    MONSTERS_RESULT,
    MONSTERS_ERROR,
    MONSTER_DETAILS_FETCH,
    MONSTER_DETAILS_RESULT,
    MONSTER_DETAILS_ERROR,
    MONSTER_CLEAR_SELECTED
} from '../types';

const INITIAL_STATE = {
    list: [],
    details: null,
    isLoadingList: false,
    isLoadingDetails: false,
    listError: null,
    detailsError: null
};

const monsterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MONSTERS_FETCH:
            return {
                ...state,
                isLoadingList: true
            };
        case MONSTERS_RESULT:
            return {
                ...state,
                isLoadingList: false,
                list: action.payload
            };
        case MONSTERS_ERROR:
            return {
                ...state,
                isLoadingList: false,
                listError: action.payload
            };
        case MONSTER_DETAILS_FETCH:
            return {
                ...state,
                isLoadingDetails: true
            };
        case MONSTER_DETAILS_RESULT:
            return {
                ...state,
                isLoadingDetails: false,
                selected: action.payload.number,
                details: action.payload
            };
        case MONSTER_DETAILS_ERROR:
            return {
                ...state,
                isLoadingDetails: false,
                detailsError: action.payload
            };
        case MONSTER_CLEAR_SELECTED:
            return {
                ...state,
                details: null
            };
        default:
            return state;
    }
};

export default monsterReducer;
