import { takeEvery, call, put } from 'redux-saga/effects';
import {
    MONSTERS_FETCH,
    MONSTERS_RESULT,
    MONSTERS_ERROR,
    MONSTER_DETAILS_FETCH,
    MONSTER_DETAILS_RESULT,
    MONSTER_DETAILS_ERROR
} from '../types';
import { MONSTER_API_URL } from '../util';

function* fetchMonsters() {
    try {
        const monstersStream = yield call(fetch, MONSTER_API_URL);
        const monsters = yield call([monstersStream, 'json']);

        if (monsters.success) {
            yield put({ type: MONSTERS_RESULT, payload: monsters.data });
        } else {
            yield put({ type: MONSTERS_ERROR, payload: monsters.error });
        }
    } catch (e) {
        yield put({ type: MONSTERS_ERROR, payload: e });
    }
}

function* fetchMonsterDetails({ payload }) {
    // payload is pokemon number (id)
    try {
        const monsterStream = yield call(fetch, `${MONSTER_API_URL}/${payload}`);
        const monster = yield call([monsterStream, 'json']);

        if (monster.success) {
            yield put({ type: MONSTER_DETAILS_RESULT, payload: monster.data });
        } else {
            yield put({ type: MONSTER_DETAILS_ERROR, payload: monster.error });
        }
    } catch (e) {
        yield put({ type: MONSTER_DETAILS_ERROR, payload: e });
    }
}

function* rootSaga() {
    yield takeEvery(MONSTERS_FETCH, fetchMonsters);
    yield takeEvery(MONSTER_DETAILS_FETCH, fetchMonsterDetails);
}

export default rootSaga;
