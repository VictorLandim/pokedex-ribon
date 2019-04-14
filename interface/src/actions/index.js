import { MONSTERS_FETCH, MONSTER_DETAILS_FETCH, MONSTER_CLEAR_SELECTED } from '../types';

export const fetchMonstersAction = () => ({ type: MONSTERS_FETCH });
export const fetchMonsterDetailsAction = number => ({ type: MONSTER_DETAILS_FETCH, payload: number });
export const clearSelectedMonsterAction = () => ({ type: MONSTER_CLEAR_SELECTED });
