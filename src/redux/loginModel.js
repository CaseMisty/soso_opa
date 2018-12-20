import { call, put, takeLatest } from 'redux-saga/effects'
import { handleAction, createAction } from 'redux-actions';

import * as Apis from '../constants/apiConstants';
import { kParams_ResponseCode, kParams_ServiceCode } from "../constants/dominConstants";
import { launchPOSTRequest } from '../util/request';

export const loginRequestAction = createAction('login/launchLoginRequest');

function* launchLoginRequest({ payload: { accountname, passwd }, type }) {
    const params = {
        accountname,
        passwd
    };
    const response = yield call(launchPOSTRequest, Apis.kUrl_ManagerLogin, params);

    if (
        response.responseData.succ === kParams_ResponseCode.success &&
        response.responseData.result.status === kParams_ServiceCode.Successed
    ) {
        window.localStorage.setItem("user", JSON.stringify(response.responseData.result));

        yield put({ type: 'loginSuccessed', payload: response.responseData.result });
        console.log('登录成功');
    } else {
        console.error('登录失败');
    }
}
export function* watchLaunchLoginRequest() {
    yield takeLatest(loginRequestAction, launchLoginRequest);
}

let user = window.localStorage.getItem("user");
if (user) {
    user = JSON.parse(user);
} else {
    user = {};
}

/* 
    loginResult有五个字段
    username
    accesstoken
    userid
    refreshtoken
    portrait
*/
export const loginStore = handleAction(
    'loginSuccessed',
    (state, { payload: loginResult }) => {
        return {
            ...state,
            loginState: 1,
            ...loginResult
        }
    },
    {
        loginState: user.status || 0,
        username: user.username || '',
        accesstoken: user.accesstoken || '',
        userid: user.userid || '',
        refreshtoken: user.refreshtoken || '',
        portrait: user.portrait || '',
    }
);


