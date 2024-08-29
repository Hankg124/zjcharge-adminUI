import request from '@/utils/request';
import { praseStrEmpty } from '@/utils/common';

// 查询所有站点列表
export function connectorStatus(id) {
  return request({
    url: '/basecharge/hlht/v1/sys/station/gunsShow/' + praseStrEmpty(id),
    method: 'get'
  });
}

// 充电订单统计
export function analysisOrder(query, interval = 'Hour') {
  return request({
    url: '/usercharge/zj/v1/analyse/orderStatsListBy' + interval,
    method: 'get',
    params: query
  });
}

// 收益分析
export function analysisIncome(query) {
  return request({
    url: '/usercharge/zj/v1/analyse/analyseIncome',
    method: 'get',
    params: query
  });
}

// 查询单站点运营统计
export function stationStat(id) {
  return request({
    url: '/usercharge/zj/v1/analyse/stationStats/' + praseStrEmpty(id),
    method: 'get'
  });
}

// 查询区域运营统计
export function regionStat(query) {
  return request({
    url: '/usercharge/zj/v1/analyse/totalStats/',
    method: 'get',
    params: query
  });
}
