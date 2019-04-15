import {
    MONSTERS_FETCH,
    MONSTERS_RESULT,
    MONSTERS_ERROR,
    MONSTER_DETAILS_FETCH,
    MONSTER_DETAILS_RESULT,
    MONSTER_DETAILS_ERROR,
    MONSTER_CLEAR_SELECTED,
    MODAL_CLOSE,
    MONSTER_CREATE_SHOW,
    MONSTER_EDIT_SHOW
} from '../types';

const INITIAL_STATE = {
    list: [],
    details: null,

    isLoadingList: false,
    isLoadingDetails: false,

    listError: null,
    detailsError: null,

    isModalVisible: false,
    isModalCreating: false
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
                details: null,
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
        case MODAL_CLOSE:
            return {
                ...state,
                isModalVisible: false
            };
        case MONSTER_CREATE_SHOW:
            return {
                ...state,
                isModalVisible: true,
                isModalCreating: true
            };
        case MONSTER_EDIT_SHOW:
            return {
                ...state,
                isModalVisible: true,
                isModalCreating: false
            };
        // todo add errors!
        default:
            return state;
    }
};

export default monsterReducer;
