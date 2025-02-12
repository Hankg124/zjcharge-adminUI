/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { formatPrice } from './Foundation';

/**
 * 金钱单位置换  2999 --> 2,999.00
 * @param val
 * @param unit
 * @param location
 * @returns {*}
 */
export function unitPrice(val, unit, location) {
  if (!val) val = 0;
  const price = formatPrice(val);
  if (location === 'before') {
    return price.substr(0, price.length - 3);
  }
  if (location === 'after') {
    return price.substr(-2);
  }
  return (unit || '') + price;
}

/**
 * 格式化价格  1999 --> [1999,00]
 * @param {*} val
 * @returns
 */
export function goodsFormatPrice(val) {
  if (typeof val == 'undefined') {
    return val;
  }
  const valNum = new Number(val);
  return valNum.toFixed(2).split('.');
}

/**
 * 距离计算
 * @param {*} val
 * @returns
 */
export function calcDistance(lon1, lat1, lon2, lat2) {
  const PI = 3.14159265358979323; //圆周率
  const R = 6371229; //地球半径

  let x, y, distance;
  const lonres = lon1 > lon2 ? lon1 - lon2 : lon2 - lon1;
  const latres = lat1 > lat2 ? lat1 - lat2 : lat2 - lat1;
  x = (lonres * PI * R * Math.cos((((lat1 + lat2) / 2) * PI) / 180)) / 180;
  y = ((lat2 - lat1) * PI * R) / 180;
  distance = Math.hypot(x, y);

  return distance;
}

/**
 * 脱敏姓名
 */

export function noPassByName(str) {
  if (null != str && str != undefined) {
    if (str.length <= 3) {
      return '*' + str.substring(1, str.length);
    } else if (str.length > 3 && str.length <= 6) {
      return '**' + str.substring(2, str.length);
    } else if (str.length > 6) {
      return str.substring(0, 2) + '****' + str.substring(6, str.length);
    }
  } else {
    return '';
  }
}

/**
 * 处理unix时间戳，转换为可阅读时间格式
 * @param unix
 * @param format
 * @returns {*|string}
 */
export function unixToDate(unix, format) {
  let _format = format || 'yyyy-MM-dd hh:mm:ss';
  const d = new Date(unix * 1000);
  const o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds()
  };
  if (/(y+)/.test(_format)) _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp('(' + k + ')').test(_format))
      _format = _format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return _format;
}

/**
 * 13888888888 -> 138****8888
 * @param mobile
 * @returns {*}
 */
export function secrecyMobile(mobile) {
  mobile = String(mobile);
  if (!/\d{11}/.test(mobile)) {
    return mobile;
  }
  return mobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
}

/**
 * 清除逗号
 *
 */
export function clearStrComma(str) {
  str = str.replace(/,/g, ''); //取消字符串中出现的所有逗号
  return str;
}

/**
 * 服务状态列表
 */
export function serviceStatusList(val) {
  const statusList = {
    APPLY: '申请售后',
    PASS: '通过售后',
    REFUSE: '拒绝售后',
    BUYER_RETURN: '买家退货，待卖家收货',
    SELLER_RE_DELIVERY: '商家换货/补发',
    SELLER_CONFIRM: '卖家确认收货',
    SELLER_TERMINATION: '卖家终止售后',
    BUYER_CONFIRM: '买家确认收货',
    BUYER_CANCEL: '买家取消售后',
    WAIT_REFUND: '等待平台退款',
    COMPLETE: '完成售后'
  };
  return statusList[val];
}

/**
 * 订单状态列表
 */
export function orderStatusList(val) {
  const orderStatusList = {
    UNDELIVERED: '待发货',
    UNPAID: '未付款',
    PAID: '已付款',
    DELIVERED: '已发货',
    CANCELLED: '已取消',
    COMPLETED: '已完成',
    COMPLETE: '已完成',
    TAKE: '待核验'
  };
  return orderStatusList[val];
}

/**
 * 对象数组按某一key排序
 * @param [] array
 * @returns
 */
export function arraySort(array, key) {
  if (array == null) return;
  array.sort(compare(key));
}

function compare(key) {
  return function (value1, value2) {
    const val1 = value1[key];
    const val2 = value2[key];
    return val1 - val2;
  };
}

/**
 * 空电话格式转换 null和'' 转undefined
 */
export function transPhoneNumber(num) {
  let result = undefined;
  if (num != null && num !== '') result = num;
  return result;
}
