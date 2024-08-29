/**
 * 一些常用的基础方法
 * whetherNavigate 登录后跳转判断
 * unixToDate    将unix时间戳转换为指定格式
 * dateToUnix    将时间转unix时间戳
 * deepClone     对一个对象进行深拷贝
 * formatPrice   货币格式化
 * secrecyMobile 手机号隐私保护
 * randomString  随机生成指定长度的字符串
 */

/**
 * 验证银行卡号
 */
export function checkBankno(bankno) {
  const lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
  const first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
  const newArr = [];

  for (let i = first15Num.length - 1; i > -1; i--) {
    //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }

  const arrJiShu = []; //奇数位*2的积 <9
  const arrJiShu2 = []; //奇数位*2的积 >9
  const arrOuShu = []; //偶数位数组
  for (let j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {
      //奇数位
      if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
      else arrJiShu2.push(parseInt(newArr[j]) * 2);
    } //偶数位
    else arrOuShu.push(newArr[j]);
  }

  const jishu_child1 = []; //奇数位*2 >9 的分割之后的数组个位数
  const jishu_child2 = []; //奇数位*2 >9 的分割之后的数组十位数
  for (let h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }

  let sumJiShu = 0; //奇数位*2 < 9 的数组之和
  let sumOuShu = 0; //偶数位数组之和
  let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
  let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  let sumTotal = 0;
  for (let m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }
  for (let n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }
  for (let p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }
  //计算总和
  sumTotal = sumJiShu + sumOuShu + sumJiShuChild1 + sumJiShuChild2;
  //计算Luhm值
  const k = sumTotal % 10 == 0 ? 10 : sumTotal % 10;
  const luhm = 10 - k;
  if (lastNum == luhm) {
    return true;
  } else {
    return false;
  }
}

/**
 * 将unix时间戳转换为指定格式
 * @param unix   时间戳【秒】
 * @param format 转换格式
 * @returns {*|string}
 */
export function unixToDate(unix, format) {
  if (!unix) return unix;
  let _format = format || 'yyyy-MM-dd hh:mm:ss';
  const d = new Date(unix);
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
 * 将时间转unix时间戳
 * @param date
 * @returns {number} 【秒】
 */
export function dateToUnix(date) {
  let newStr = date.replace(/:/g, '-');
  newStr = newStr.replace(/ /g, '-');
  const arr = newStr.split('-');
  const datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8 || -8, arr[4] || 0, arr[5] || 0));
  return datum.getTime() / 1000;
}

/**
 * 货币格式化
 * @param price
 * @returns {string}
 */
export function formatPrice(price) {
  if (typeof price !== 'number') return price;
  return String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 手机号隐私保护
 * 隐藏中间四位数字
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
 * 随机生成指定长度的字符串
 * @param length
 * @returns {string}
 */
export function randomString(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos = chars.length;
  let _string = '';
  for (let i = 0; i < length; i++) {
    _string += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return _string;
}

/**
 * 计算传秒数的倒计时【天、时、分、秒】
 * @param seconds
 * @returns {{day : *, hours : *, minutes : *, seconds : *}}
 */

export function countTimeDown(seconds) {
  const leftTime = (time) => {
    if (time < 10) time = '0' + time;
    return time + '';
  };
  return {
    day: leftTime(seconds / 60 / 60 / 24),
    hours: leftTime((seconds / 60 / 60) % 24),
    minutes: leftTime((seconds / 60) % 60),
    seconds: leftTime(seconds % 60)
  };
}

/**
 * 计算当前时间到第二天0点的倒计时[秒]
 * @returns {number}
 */
export function theNextDayTime() {
  const nowDate = new Date();
  const time = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0).getTime() - nowDate.getTime();
  return time / 1000;
}

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(url) {
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr.splice(1).join('='));
      obj[key] = val;
    });
  }
  return obj;
}
