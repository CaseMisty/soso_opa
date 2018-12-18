/**
 * 一级页
 ****************/
export const kAnalysisPath = { path: '/dashboard/analysis' }; // 分析页
export const kMonitorPath = { path: '/dashboard/monitor' }; // 监控页
export const kWorkplacePath = { path: '/dashboard/workplace' }; // 工作台

export const kUserlistPath = { path: '/userlist' }; // 用户列表页
export const kAuthlistPath = { path: '/authlist' }; // 认证列表页

/**
 * 二级页
 ****************/
export const kUserinfoPath = { path: '/userinfo', rootPath: '/userlist' }; // 用户详情页
export const kAuthinfoPath = { path: '/authinfo', rootPath: '/authlist' }; // 认证详情页


export const pagePath = {
    '/dashboard/analysis': kAnalysisPath,
    '/dashboard/monitor': kMonitorPath,
    '/dashboard/workplace': kWorkplacePath,
    '/userlist': kUserlistPath,
    '/authlist': kAuthlistPath,

    '/userinfo': kUserinfoPath,
    '/authinfo': kAuthinfoPath
};