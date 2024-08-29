export interface UserVO {
  /**
   * 自增id
   */
  uid: string | number;

  /**
   * 国家区号码
   */
  phoneCode: string;

  /**
   * 用户手机号
   */
  mobile: string;

  /**
   * 用户昵称
   */
  nickName: string;

  /**
   * 微信昵称
   */
  wechatName: string;

  /**
   * 当且仅当该移动应用已获得该用户的 userinfo 授权时，才会出现该字段
   */
  unionidWx: string | number;

  /**
   * 小程序openID
   */
  openidWx: string | number;

  /**
   * ali统一id
   */
  unionidAli: string | number;

  /**
   * 支付宝用户唯一标识
   */
  openidAli: string | number;

  /**
   * 微信信用分授权-后支付
   */
  creditPayWx: number;

  /**
   * 阿里信用分授权-后支付
   */
  creditPayAli: number;

  /**
   * 0、未知;1、男;2、女
   */
  sex: number;

  /**
   * 国家
   */
  country: string;

  /**
   * 省
   */
  province: string;

  /**
   * 城市
   */
  city: string;

  /**
   * 生日
   */
  birthday: number;

  /**
   * 头像地址
   */
  avatar: string;

  /**
   * 注册来源的平台:关联平台id(0未知)
   */
  platform: string;

  /**
   * 是否禁用用户:0、启用;1、禁用
   */
  disableFlag: string;

  /**
   * 注册时间
   */
  registerTime: string;

  /**
   * 最近一次访问时间
   */
  lastVisitTime: string;

  /**
   * 最近一次访问ip
   */
  lastVisitIp: string;

  /**
   * 最近一次访问ip对应区域
   */
  lastVisitArea: string;

  /**
   * 用户是否从属组织机构:0、不从属;1、从属
   */
  orgFlag: string;

  /**
   * 备注
   */
  remark: string;

}

export interface UserForm extends BaseEntity {
  /**
   * 自增id
   */
  uid?: string | number;

  /**
   * 国家区号码
   */
  phoneCode?: string;

  /**
   * 用户手机号
   */
  mobile?: string;

  /**
   * 用户昵称
   */
  nickName?: string;

  /**
   * 微信昵称
   */
  wechatName?: string;

  /**
   * 当且仅当该移动应用已获得该用户的 userinfo 授权时，才会出现该字段
   */
  unionidWx?: string | number;

  /**
   * 小程序openID
   */
  openidWx?: string | number;

  /**
   * ali统一id
   */
  unionidAli?: string | number;

  /**
   * 支付宝用户唯一标识
   */
  openidAli?: string | number;

  /**
   * 微信信用分授权-后支付
   */
  creditPayWx?: number;

  /**
   * 阿里信用分授权-后支付
   */
  creditPayAli?: number;

  /**
   * 0、未知;1、男;2、女
   */
  sex?: number;

  /**
   * 国家
   */
  country?: string;

  /**
   * 省
   */
  province?: string;

  /**
   * 城市
   */
  city?: string;

  /**
   * 生日
   */
  birthday?: number;

  /**
   * 头像地址
   */
  avatar?: string;

  /**
   * 注册来源的平台:关联平台id(0未知)
   */
  platform?: string;

  /**
   * 是否禁用用户:0、启用;1、禁用
   */
  disableFlag?: string;

  /**
   * 注册时间
   */
  registerTime?: string;

  /**
   * 最近一次访问时间
   */
  lastVisitTime?: string;

  /**
   * 最近一次访问ip
   */
  lastVisitIp?: string;

  /**
   * 最近一次访问ip对应区域
   */
  lastVisitArea?: string;

  /**
   * 用户是否从属组织机构:0、不从属;1、从属
   */
  orgFlag?: string;

  /**
   * 备注
   */
  remark?: string;

}

/**用户列表 */
export interface UserListQuery extends PageQuery {
  /**用户名 */
    nickName: string;
    /**手机号 */
    mobile: string;
    /**是否禁用用户:0、启用;1、禁用 */
    disableFlag: string | number;
    /**
     * 日期范围参数
     */
    params?: any;
}
/**用户启用/禁用 */
export interface UserOptVO {
  /**用户id */
  userId: string | number;
  /**是否禁用用户:0、启用;1、禁用 */
  disableFlag: string;
}
