import request from '@/utils/request';

// 查询所有运营商列表
export function listOrder(query) {
  return request({
    url: '/basecharge/hlht/v1/sys/charge/order/page',
    method: 'get',
    params: query
  });
}
