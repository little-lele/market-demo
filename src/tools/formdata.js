
// export default function dateFamate(date, fmt) { //author: meizz 
//     var o = {
//         "M+": date.getMonth() + 1,     //月份 
//         "d+": date.getDate(),     //日 
//         "h+": date.getHours(),     //小时 
//         "m+": date.getMinutes(),     //分 
//         "s+": date.getSeconds(),     //秒 
//         "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
//         "S": date.getMilliseconds()    //毫秒 
//     };
//     if (/(y+)/.test(fmt))
//         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var k in o)
//         if (new RegExp("(" + k + ")").test(fmt))
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// }

// 时间格式化工具
import Vue from 'vue';
import moment from 'moment';
// 中文简体
moment.locale('zh-cn');
Vue.filter('dateFamate', (dataStr) => {
    return moment(dataStr).format('YYYY年MM月DD日')
})