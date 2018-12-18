import * as DominConfigs from '../constants/dominConstants';
import LLCDateHelper from './dateHelper';
var forge = require('node-forge');

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
    const response = await fetch(url, options);
    checkStatus(response);
    return await response.json();
}

export async function launchPOSTRequest(
    url,
    params = {},
    requestTyp = DominConfigs.kRequestType.POST,
    ignoreParam = false
) {
    const privateKey = DominConfigs.kPrivateKey;

    // headers
    const t = LLCDateHelper.achiveTimestampOfSecond();
    const os = 'opt';

    // sign
    const md = forge.md.md5.create();
    md.update(`${privateKey}${t}`);

    // 请求头
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        t,
        os,
        sign: md.digest().toHex()
    };

    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);

        headers.accesstoken = user.accesstoken;
    }

    const fetchParams = {
        method: requestTyp,
        headers
    };

    // 根据不同的请求类型 拼装请求参数
    if (requestTyp === DominConfigs.kRequestType.POST) {
        fetchParams.body = JSON.stringify(params);
    } else if (requestTyp === DominConfigs.kRequestType.GET) {
        if (!ignoreParam) {
            const allKey = Object.keys(params);

            if (allKey && allKey.length > 0) {
                if (url.indexOf('?') === -1) {
                    url = `${url}?`;
                } else {
                    if (url.indexOf('=') !== -1) {
                        url = url + '&';
                    }
                }

                let query = '';
                for (let i = 0; i < allKey.length; i += 1) {
                    query = `${query + allKey[i]}=${params[allKey[i]]}`;
                    if (i !== allKey.length - 1) {
                        query = `${query}&`;
                    }
                }

                url = url + query;
            }
        }
    } else if (requestTyp === DominConfigs.kRequestType.PUT) {
        fetchParams.body = JSON.stringify(params);
    }

    console.log(
        `\n发起${requestTyp}请求-----------------\n` +
        `* url:\n${url}\n* headers:\n${JSON.stringify(headers)}\n` +
        `* params:\n${JSON.stringify(params)}\n-----------------`
    );


    try {

        // 发起请求
        const response = await fetch(url, fetchParams);
        const responseData = await response.json();

        // AccessToken失效
        if (
            responseData.succ ===
            DominConfigs.kParams_ResponseCode.BadAccessToken
        ) {
            throw new Error(
                `${
                    DominConfigs.kParams_ResponseCode.BadAccessToken
                    }`
            );
        } else {
            console.log(
                `${'\n请求返回-----------------\n' +
                '* status:\n'}${
                    responseData.succ
                    }\n* responseData:\n${JSON.stringify(
                    responseData
                )}\n-----------------`
            );

            if (
                responseData.succ ===
                DominConfigs.kParams_ResponseCode.success
            ) {
                // 请求成功 succ: 200 && result.status: 1
                if (responseData.result) {
                    if (responseData.result.status &&
                        responseData.result.status === DominConfigs.kParams_ServiceCode.Successed) {
                        return {succ: responseData.succ, responseData};
                    } else {
                        return {msg: responseData.msg, responseData};
                    }
                } else {
                    return {msg: responseData.msg, responseData};
                }
            } else if (
                responseData.succ ===
                DominConfigs.kParams_ResponseCode
                    .BadRefreshToken
            ) {
                // RefreshToken失效 重新登录
                // GlobalStore.dispatch(requestLogout());
            } else {
                // 请求失败
                return {msg: responseData.msg, responseData};
            }


            return {succ: responseData.succ, responseData};
        }
    } catch (e) {

    }
}