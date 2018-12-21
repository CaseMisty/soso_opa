import { call, put, takeLatest } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
import { message } from 'antd';

import { kParams_ResponseCode, kParams_ServiceCode } from "../constants/dominConstants";
import { launchPOSTRequest } from "../util/request";
import * as Apis from '../constants/apiConstants';

export const actions = {
    queryAuthInfo: createAction('queryAuthInfo'),
    updateAuthToPass: createAction('updateAuthToPass'),
    updateAuthToReject: createAction('updateAuthToReject'),
    queryChangePending: createAction('queryChangePending'),
    selectedAuth: createAction('selectedAuth')
};
const loadingChanged = createAction('loadingChanged');
const recordAuthList = createAction('recordAuthList');

const effects = {
    *queryAuthInfo({ payload }) {
        yield put(loadingChanged({ loading: true }));

        const params = {
            page: payload.page,
            authstage: payload.authstage,
            officialauth: payload.officialauth
        };
        const response = yield call(launchPOSTRequest, Apis.kUrl_QueryAuthInfo, params);

        if (
            response.responseData.succ === kParams_ResponseCode.success &&
            response.responseData.result.status === kParams_ServiceCode.Successed
        ) {
            yield put(recordAuthList(response.responseData.result));
            yield put(loadingChanged({ loading: false }));
        } else {
            yield put(loadingChanged({ loading: false }));
            message.error(response.msg);
        }
    },
    *updateAuthToPass({ payload }) {
        yield put(loadingChanged({ loading: true }));

        const params = {
            authlist: payload.authlist,
            note: payload.note
        };
        const response = yield call(launchPOSTRequest, Apis.kUrl_UpdateAuthToPass, params);

        if (
            response.responseData.succ === kParams_ResponseCode.success &&
            response.responseData.result.status === kParams_ServiceCode.Successed
        ) {
            yield put(loadingChanged({ loading: false }));
        } else {
            yield put(loadingChanged({ loading: false }));
            message.error(response.msg);
        }
    },
    *updateAuthToReject({ payload }) {
        yield put(loadingChanged({ loading: true }));

        const params = {
            authlist: payload.authlist,
            note: payload.note
        };
        const response = yield call(launchPOSTRequest, Apis.kUrl_UpdateAuthToReject, params);

        if (
            response.responseData.succ === kParams_ResponseCode.success &&
            response.responseData.result.status === kParams_ServiceCode.Successed
        ) {
            yield put(loadingChanged({ loading: false }));
        } else {
            yield put(loadingChanged({ loading: false }));
            message.error(response.msg);
        }
    },
    *queryChangePending({ payload }) {
        yield put(loadingChanged({ loading: true }));

        const params = {
            userid: payload.userid
        };

        const response = yield call(launchPOSTRequest, Apis.kUrl_QueryChangePending, params);

        if (
            response.responseData.succ === kParams_ResponseCode.success &&
            response.responseData.result.status === kParams_ServiceCode.Successed
        ) {
            yield put({ type: 'recordChangePending', payload: response.responseData.result });
            yield put(loadingChanged({ loading: false }));
        } else {
            yield put(loadingChanged({ loading: false }));
            message.error(response.msg);
        }
    },
    *selectedAuth({ payload }) {
        yield put({ type: 'recordSelectedAuth', payload: payload.auth });
    }
}

export const watchers = {
    *queryAuthInfo() {
        yield takeLatest(actions.queryAuthInfo, effects.queryAuthInfo);
    },
    *updateAuthToPass() {
        yield takeLatest(actions.updateAuthToPass, effects.updateAuthToPass);
    },
    *updateAuthToReject() {
        yield takeLatest(actions.updateAuthToReject, effects.updateAuthToReject);
    },
    *queryChangePending() {
        yield takeLatest(actions.queryChangePending, effects.queryChangePending);
    },
    *selectedAuth() {
        yield takeLatest(actions.selectedAuth, effects.selectedAuth);
    }
};

export const authlist = handleActions(
    {
        recordAuthList(state, { payload: result }) {
            return {
                ...state,
                pagesize: result.pagesize,
                authList: result.list,
                totalpage: result.totalpage,
                page: result.page,
                loading: false
            };
        },
        loadingChanged(state, { payload: result }) {
            return {
                ...state,
                loading: result.loading
            };
        },
        recordSelectedAuth(state, { payload: result }) {
            return {
                ...state,
                selectedAuth: result
            };
        },
        recordChangePending(state, { payload: result }) {
            return {
                ...state,
                changePending: result
            }
        }
    },
    {
        loading: false,
        authList: [],
        pagesize: 0,
        totalpage: 0,
        page: 1,
        authstage: 99,
        officialauth: 99,

        selectedAuth: undefined,
        changePending: {}
    }
);
