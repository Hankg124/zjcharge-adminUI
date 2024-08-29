import request from '@/utils/request';

// 根据任务号获取详情
export function getExportTaskBase(taskId) {
  return request({
    url: '/basecharge/hlht/v1/sys/export/' + taskId,
    method: 'get'
  });
}

// 获取任务分页列表
export function listExportTaskBase(params) {
  return request({
    url: '/basecharge/hlht/v1/sys/export/page',
    method: 'get',
    params: params
  });
}
