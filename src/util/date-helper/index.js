'use strict';

/*
* 时间工具类
*/
const LLCDateHelper = {};
export default LLCDateHelper;

/** 获取时间戳(秒) */
LLCDateHelper.achiveTimestampOfSecond = function () {
    return Date.parse(new Date()) / 1000;
};

/** 获取时间戳(毫秒) */
LLCDateHelper.achiveTimestampOfMsec = function () {
    return new Date().getTime();
};

/** 时间戳转字符串 */
LLCDateHelper.formatDate = function (timestamp, formater) {
    let date = new Date();
    date.setTime(parseInt(timestamp*1000));
    formater = (formater != null)? formater : 'yyyy-MM-dd hh:mm';
    Date.prototype.Format = function (fmt) {
        const o = {
            "M+": this.getMonth() + 1, //月
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };

        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    };
    return date.Format(formater);
};