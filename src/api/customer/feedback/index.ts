import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FeedbackForm, FeedbackVO, FeedbackQuery } from './types';
// 查询所有站点列表
export const listFeedback = (query?: FeedbackQuery): AxiosPromise<FeedbackVO[]> => {
  return request({
    url: '/usercharge/zj/v1/feedback/list',
    method: 'get',
    params: query
  });
};

// 查询站点详情
export const getFeedback = (id: number): AxiosPromise<FeedbackVO> => {
  return request({
    url: '/usercharge/zj/v1/feedback/' + id,
    method: 'get'
  });
};

// 新增站点
export const addFeedback = (data: FeedbackForm) => {
  return request({
    url: '/usercharge/zj/v1/feedback',
    method: 'post',
    data: data
  });
};

// 修改站点
export const updateFeedback = (data: FeedbackForm) => {
  return request({
    url: '/usercharge/zj/v1/feedback',
    method: 'put',
    data: data
  });
};

// 删除站点
export const delFeedback = (id: number) => {
  return request({
    url: '/usercharge/zj/v1/feedback/' + id,
    method: 'delete'
  });
};
