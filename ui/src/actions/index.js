import {
    MONSTERS_FETCH,
    MONSTER_DETAILS_FETCH,
    MONSTER_CLEAR_SELECTED,
    MONSTER_DELETE_SUBMIT,
    MONSTER_CREATE_SHOW,
    MONSTER_CREATE_SUBMIT,
    MONSTER_EDIT_SHOW,
    MONSTER_EDIT_SUBMIT,
    MODAL_CLOSE
} from '../types';

export const fetchMonstersAction = () => ({ type: MONSTERS_FETCH });
export const fetchMonsterDetailsAction = number => ({ type: MONSTER_DETAILS_FETCH, payload: number });
export const clearSelectedMonsterAction = () => ({ type: MONSTER_CLEAR_SELECTED });
export const submitMonsterDeleteAction = id => ({ type: MONSTER_DELETE_SUBMIT, payload: id });
export const showMonsterCreateAction = () => ({ type: MONSTER_CREATE_SHOW });
export const showMonsterEditAction = () => ({ type: MONSTER_EDIT_SHOW });
export const submitMonsterCreateAction = monster => ({ type: MONSTER_CREATE_SUBMIT, payload: monster });
export const submitMonsterEditAction = monster => ({ type: MONSTER_EDIT_SUBMIT, payload: monster });
export const modalCloseAction = () => ({ type: MODAL_CLOSE });
