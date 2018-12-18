import { kEnum_SAP } from '../constants/appConstants';

// 环境控制
// export const kSAP_Control = kEnum_SAP.kSAP_DEV;     // 开发环境
export const kSAP_Control = kEnum_SAP.kSAP_TEST; // 测试环境
// export const kSAP_Control = kEnum_SAP.kSAP_PRO;  // 生产环境


// 项目版本号
export const kAppVersion = 'v1.0.0';

/*
    项目内部版本号
    规则：1.0.0    版本为    10000000
         99.99.99 版本为   999999000
         后三位为打包测试时使用 每打包一次+1
 */
export const kAPPInfo_Appversion = '10000000';




