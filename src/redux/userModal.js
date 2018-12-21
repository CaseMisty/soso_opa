import { call, put, takeLatest } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
import { message } from 'antd';

import { kParams_ResponseCode, kParams_ServiceCode } from "../constants/dominConstants";
import * as Apis from '../constants/apiConstants';

import { launchPOSTRequest } from '../util/request';

// let selectedUser = window.localStorage.getItem("selectedUser");
// if (selectedUser) {
//     selectedUser = JSON.parse(selectedUser);
// }

export const actions = {
    queryUserInfo: createAction('queryUserInfo'),
    selectedUser: createAction('selectedUser')
};
const loadingChanged = createAction('loadingChanged');
const recordUserList = createAction('recordUserList');
const recordSelectedUser = createAction('recordSelectedUser');

const effects = {
    *queryUserInfo({ payload }) {
        yield put(loadingChanged({ loading: true }));
        const params = {
            page: payload.page
        };
        const response = yield call(launchPOSTRequest, Apis.kUrl_QueryUserInfo, params);
        if (
            response.responseData.succ === kParams_ResponseCode.success &&
            response.responseData.result.status === kParams_ServiceCode.Successed
        ) {
            yield put(recordUserList(response.responseData.result));
        } else {
            yield put(loadingChanged({ loading: false }));
            message.error(response.msg);
        }
    },
    *selectedUser({ payload }) {
        // window.localStorage.setItem("selectedUser", JSON.stringify(payload.user));
        yield put(recordSelectedUser(payload.user));
    }
}

export const watchers = {
    *selectedUser() {
        yield takeLatest(actions.selectedUser, effects.selectedUser);
    },
    *queryUserInfo() {
        yield takeLatest(actions.queryUserInfo, effects.queryUserInfo);
    }
};

/* 
    reducer
    namespace: 'userlist' 
*/
export const userlist = handleActions(
    {
        recordUserList(state, { payload: result }) {
            return {
                ...state,
                pagesize: result.pagesize,
                userList: result.list,
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
        recordSelectedUser(state, { payload: result }) {
            return {
                ...state,
                selectedUser: result
            };
        }
    },
    {
        loading: false,
        userList: [],
        pagesize: 0,
        totalpage: 0,
        page: 1,
        selectedUser: undefined
    }
);

function onStateChange(state) {
    console.log(state, '改变state');
}
