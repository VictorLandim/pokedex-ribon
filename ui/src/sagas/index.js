import { takeEvery, call, put } from 'redux-saga/effects';
import {
    MONSTERS_FETCH,
    MONSTERS_RESULT,
    MONSTERS_ERROR,
    MONSTER_DETAILS_FETCH,
    MONSTER_DETAILS_RESULT,
    MONSTER_DETAILS_ERROR,
    MONSTER_DELETE_SUBMIT,
    MONSTER_DELETE_ERROR,
    MONSTER_CREATE_SUBMIT,
    MONSTER_EDIT_SUBMIT,
    MONSTER_CREATE_ERROR,
    MODAL_CLOSE,
    MONSTER_EDIT_ERROR
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
        // const delay = ms => new Promise(res => setTimeout(res, ms));
        // yield delay(300);

        const monsterStream = yield call(fetch, `${MONSTER_API_URL}/${payload}`);
        const monster = yield call([monsterStream, 'json']);
        // console.log(monster.evolution_chain);
        // const monsterData = { ...monster.data, evolution_chain: JSON.parse(monster.data.evolution_chain) };

        if (monster.success) {
            yield put({ type: MONSTER_DETAILS_RESULT, payload: monster.data });
        } else {
            yield put({ type: MONSTER_DETAILS_ERROR, payload: monster.error });
        }
    } catch (e) {
        yield put({ type: MONSTER_DETAILS_ERROR, payload: e });
    }
}

function* deleteMonster({ payload }) {
    try {
        const monsterStream = yield call(fetch, `${MONSTER_API_URL}/${payload}`, {
            method: 'DELETE'
        });
        const monster = yield call([monsterStream, 'json']);

        if (monster.success) {
            // deleted monster: update list!
            yield put({ type: MONSTERS_FETCH });
        } else {
            yield put({ type: MONSTER_DELETE_ERROR, payload: monster.error });
        }
    } catch (e) {
        yield put({ type: MONSTER_DELETE_ERROR, payload: e });
    }
}

function* createMonster({ payload }) {
    try {
        const monsterStream = yield call(fetch, MONSTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const monster = yield call([monsterStream, 'json']);

        if (monster.success) {
            // created monster: update list!
            yield put({ type: MODAL_CLOSE });
            yield put({ type: MONSTERS_FETCH });
        } else {
            yield put({ type: MONSTER_CREATE_ERROR, payload: monster.error });
        }
    } catch (e) {
        console.log(e);
        yield put({ type: MONSTER_CREATE_ERROR, payload: e });
    }
}

function* editMonster({ payload }) {
    try {
        const monsterStream = yield call(fetch, `${MONSTER_API_URL}/${payload.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const monster = yield call([monsterStream, 'json']);

        if (monster.success) {
            // updated monster: update list!
            yield put({ type: MODAL_CLOSE });
            yield put({ type: MONSTERS_FETCH });
        } else {
            yield put({ type: MONSTER_EDIT_ERROR, payload: monster.error });
        }
    } catch (e) {
        console.log(e);
        yield put({ type: MONSTER_EDIT_ERROR, payload: e });
    }
}

function* rootSaga() {
    yield takeEvery(MONSTERS_FETCH, fetchMonsters);
    yield takeEvery(MONSTER_DETAILS_FETCH, fetchMonsterDetails);
    yield takeEvery(MONSTER_DELETE_SUBMIT, deleteMonster);
    yield takeEvery(MONSTER_CREATE_SUBMIT, createMonster);
    yield takeEvery(MONSTER_EDIT_SUBMIT, editMonster);
}

export default rootSaga;
