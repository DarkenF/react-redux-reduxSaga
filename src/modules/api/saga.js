import api from './api'
import {apiActions, API_ACTIONS} from "./actions";
import {takeEvery, put, all} from "redux-saga/effects";

export function* onApiLoad({payload, type}) {
    const actionType = type.replace(API_ACTIONS.FETCH_START, '').toLowerCase();

    try {
        const response = yield api.fetch(actionType, payload)

        yield put(apiActions.fetchSuccess(actionType, response)) // dispatch action
    }catch (e) {
        yield put(apiActions.fetchSuccess(actionType, e)) // dispatch action
    }
}

export function* watchApiLoad() {
    yield takeEvery(action => action.type.startsWith(API_ACTIONS.FETCH_START), onApiLoad)
}

export function* apiRootSaga() { // Запуск всех саг одновременно
    yield all ([
        watchApiLoad()
    ])
}