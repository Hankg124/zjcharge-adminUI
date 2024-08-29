export interface CarVO {
  /**
   * 车辆ID
   */
  id: string | number;

  /**
   * 用户ID
   */
  userId: string | number;

  /**
   * 车牌号
   */
  plateNo: string;

  /**
   * 车辆vin码
   */
  carVin: string;

  /**
   * 发动机号码
   */
  engineNo: string;

  /**
   * 车辆类型
   */
  vehicleType: string;

  /**
   * 品牌型号
   */
  carModel: string;

  /**
   * 车辆所有人
   */
  owner: string;

  /**
   * 住址
   */
  address: string;

  /**
   * 使用性质:运营、非运营
   */
  useCharacter: string;

  /**
   * 注册日期(格式"yyyy-MM-dd")
   */
  registerDate: string;

  /**
   * 发证日期(格式"yyyy-MM-dd")
   */
  issueDate: string;

  /**
   * 行驶证图片json串
   */
  licenseImgs: string;

  /**
   * 审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核
   */
  checkState: string;

  /**
   * 认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过
   */
  authState: string;

  /**
   * 备注
   */
  remark: string;

}

export interface CarForm extends BaseEntity {
  /**
   * 车辆ID
   */
  id?: string | number;

  /**
   * 用户ID
   */
  userId?: string | number;

  /**
   * 车牌号
   */
  plateNo?: string;

  /**
   * 车辆vin码
   */
  carVin?: string;

  /**
   * 发动机号码
   */
  engineNo?: string;

  /**
   * 车辆类型
   */
  vehicleType?: string;

  /**
   * 品牌型号
   */
  carModel?: string;

  /**
   * 车辆所有人
   */
  owner?: string;

  /**
   * 住址
   */
  address?: string;

  /**
   * 使用性质:运营、非运营
   */
  useCharacter?: string;

  /**
   * 注册日期(格式"yyyy-MM-dd")
   */
  registerDate?: string;

  /**
   * 发证日期(格式"yyyy-MM-dd")
   */
  issueDate?: string;

  /**
   * 行驶证图片json串
   */
  licenseImgs?: string;

  /**
   * 审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核
   */
  checkState?: string;

  /**
   * 认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过
   */
  authState?: string;

  /**
   * 备注
   */
  remark?: string;

}

/**用户车辆列表信息 */
export interface CarQuery extends PageQuery {
  /**用户名称 */
  nickName?: string;
  /**手机号 */
  mobile?: string;
  /**车牌号 */
  plateNo?: string;
  /**车辆Vin码 */
  carVin?: string;
  /**审核状态:0、待审核;1、审核通过;2、审核不通过 */
  checkState?: string | number;
  /**认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过 */
  authState?: string | number;
  /**
   * 日期范围参数
   */
  params?: any;
}
/**插入用户车辆 */
export interface CarInsertForm extends BaseEntity {
  /**用户id */
  userId: number | string;
  /**充电订单号 */
  startChargeSeq: string;
  /**车牌号 */
  plateNo: string;
}
/**更新车牌信息 */
export interface CarUpdateForm extends BaseEntity {
  /**关联ID */
  id: number | string;
  /**用户id */
  userId: number | string;
  /**车牌号 */
  plateNo: string;
}
/**用户车辆审核信息 */
export interface CarCheckDT {
  /**车辆id */
  id: number | string;
  /**审核状态:0、待审核;1、审核通过;2、审核不通过 */
  checkState: string | number;
}
