import { kSAP_Control } from "../config/appConfig";
import { kEnum_SAP } from "./appConstants";

/** 私钥 */
export const kPrivateKey = 'lsan53719&';

/** 域名 */
export let kDomain = 'https://codestation.soso-code.com';

if (kSAP_Control === kEnum_SAP.kSAP_DEV) {
    // 开发环境域名
    kDomain = 'http://192.168.31.110:8080/codestation-web';
} else if (kSAP_Control === kEnum_SAP.kSAP_TEST) {
    // 测试环境域名
    kDomain = 'http://codestation_test.soso-code.com';
} else {
    // 生产环境域名
    kDomain = 'https://codestation.soso-code.com';
}

export const kProxyPart = '/webapi';

/** 模块 */
export const kPart = {
    OptManager: '/optmanager',
    OptUser: '/optuser',
    OptAuth: '/optauth'
};


export const kRequestType = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT'
};

export const kParams_ResponseCode = {
    success: 200,
    BadAccessToken: 460,
    BadRefreshToken: 461
};

export const kParams_ServiceCode = {
    Successed: 1
};