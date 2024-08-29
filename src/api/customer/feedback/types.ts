export interface FeedbackVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 用户ID
   */
  userId: string | number;

  /**
   * 桩ID
   */
  connectorId: string | number;

  /**
   * 反馈类型:1、充电站;2、充电桩;3、充电枪;50、其他
   */
  feedbackType: string;

  /**
   * 反馈内容
   */
  feedbackContent: string;

  /**
   * 图片
   */
  imgs: string;

  /**
   * 回复内容
   */
  replyContent: string;

  /**
   * 是否回复:0、未回复;1、已回复
   */
  replyFlag: string;

  /**
   * 备注
   */
  remark: string;
}

export interface FeedbackForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 回复内容
   */
  replyContent?: string;

}
/**用户反馈信息列表查询 */
export interface FeedbackQuery extends PageQuery {
  /*用户名*/
  nickName?: string | number;

  /**
   * 手机号
   */
  mobile?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
