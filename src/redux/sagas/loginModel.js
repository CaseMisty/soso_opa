import { call, put, takeEvery } from 'redux-saga/effects'
import { handleAction, createAction } from 'redux-actions';

import * as Apis from '../../constants/apiConstants';
import { kParams_ResponseCode, kParams_ServiceCode } from "../../constants/dominConstants";
import { launchPOSTRequest } from '../../util/request';

export const loginRequestAction = createAction('login/launchLoginRequest');
export const loginStore = handleAction(
    'loginSuccessed',
    (state, { payload: result }) => {
        debugger;
        return {
            ...state,
            loginState: 1,
            username: result.username,
            accesstoken: result.accesstoken,
            userid: result.userid,
            refreshtoken: result.refreshtoken,
            portrait: result.portrait
        }
    },
    {
        loginState: 0,
        username: '',
        accesstoken: '',
        userid: '',
        refreshtoken: '',
        portrait: ''
    }
);

function* launchLoginRequest({ payload: { accountname, passwd }, type }) {
    debugger;
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
        // router.push(PathConstants.kAnalysisPath.path);
        console.log('登录成功');
    } else {
        // message.error(response.msg);
        console.error('登录失败');
    }
}

export function* watchLaunchLoginRequest() {
    yield takeEvery(loginRequestAction, launchLoginRequest);
}
