import { combineReducers } from 'redux';
import monsterReducer from './monster';

export default combineReducers({
    monster: monsterReducer
});
