
import * as DominConfigs from './dominConstants';

/** 七牛 */
export const kUrl_UploadToQiniu = 'https://up-z1.qiniup.com'; // 上传七牛

/**
 * optmanager
 *****************************/
export const kUrl_ManagerLogin = `${DominConfigs.kProxyPart}${DominConfigs.kPart.OptManager}/optlogin.do`; // 登录

/**
 * optuser
 *****************************/
export const kUrl_QueryUserInfo = `${DominConfigs.kProxyPart}${DominConfigs.kPart.OptUser}/optuserinfo.do`; // 查询用户信息

/**
 * optauth
 *****************************/
export const kUrl_QueryAuthInfo = `${DominConfigs.kProxyPart}${DominConfigs.kPart.OptAuth}/optauthlist.do`; // 查询认证信息
export const kUrl_QueryChangePending = `${DominConfigs.kProxyPart}${DominConfigs.kPart.OptAuth}/optchangepending.do`; // 驳回用户认证
export const kUrl_UpdateAuthToPass = `${DominConfigs.kProxyPart}${DominConfigs.kPart.OptAuth}/optpassauth.do`; // 通过用户认证
export const kUrl_UpdateAuthToReject = `${DominConfigs.kProxyPart}${DominConfigs.kPart.OptAuth}/optrejectauth.do`; // 驳回用户认证