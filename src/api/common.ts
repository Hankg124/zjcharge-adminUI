import request from '@/utils/request';

export function upload(data) {
  return request({
    url: '/resource/oss/upload',
    method: 'POST',
    data
  });
}

// 获取视频第一帧
export function getVideoPic(params) {
  return request({
    url: '/file/getVideoFirstImg/',
    params
  });
}

/**
 * 下载网络连接文件
 * @param {*} params
{
  url=文件路径&
  name=文件名称，带后缀
}
 */
export function download(url, name) {
  return `/common/download/url?url=${url}&name=${name}`;
}

// 省市区 级联数据
export function getProCityList(data) {
  return request({
    url: '/system/system/area/list',
    params: data
  });
}

/**
 * 获取微信授权链接
 * @param {*} redirectUrl 回调跳转地址
 * @returns
 */
export function getWxRedirect(redirectUrl = location.href) {
  return request({
    url: '/auth/wxRedirect',
    method: 'get',
    params: {
      redirectUrl
    }
  });
}

/**
 * 微信获取token接口
 * @param {*} code 是 code码 必填
 * @param {*} openId 否 微信用户ID 非必填
 * @returns
 */
export function wxLogin(code, openId) {
  return request({
    url: '/auth/wxLogin',
    method: 'get',
    params: {
      code,
      openId
    }
  });
}

/**
 * 获取微信授权用户信息
 * @param {*} openId
 */
export function getWechatUserInfo() {
  return request({
    url: `/system/user/getWxInfo`
  });
}
