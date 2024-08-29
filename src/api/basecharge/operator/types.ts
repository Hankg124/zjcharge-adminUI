export interface OperatorVO {
  /**
   *
   */
  id: string | number;

  /**
   * 运营商ID（组织机构代码）
   */
  operatorId: string | number;

  /**
   * 机构全称
   */
  operatorName: string;

  /**
   * 运营商电话1
   */
  operatorTel1: string;

  /**
   * 运营商电话2
   */
  operatorTel2: string;

  /**
   * 运营商注册地址
   */
  operatorRegAddress: string;

  /**
   * 备注信息
   */
  operatorNote: string;

  /**
   * 运营商国标接口http请求前缀，以/结尾
   */
  host: string;

  /**
   * 运营商密钥0-F字符组成,可采用32H、48H、64H
   */
  operatorSecret: string;

  /**
   * 消息密钥
   */
  dataSecret: string;

  /**
   * 消息密钥初始化向量 固定16位 用户AES加密过程的混合加密
   */
  dataSecretIv: string;

  /**
   * 签名密钥0-F字符组成,可采用32H、48H、64H 为签名的加密密钥
   */
  sigSecret: string;

  /**
   * 用户平台我方组织机构编码
   */
  myOperatorId: string | number;

  /**
   * 用户平台密钥
   */
  userOperatorSecret: string;

  /**
   * 用户平台消息密钥
   */
  userDataSecret: string;

  /**
   * 用户平台消息密钥初始化向量
   */
  userDataSecretIv: string;

  /**
   * 用户平台签名密钥
   */
  userSigSecret: string;

  /**
   * 创建人ID
   */
  createById: string | number;

  /**
   * 更新人ID
   */
  updateById: string | number;

}

export interface OperatorForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 运营商ID（组织机构代码）
   */
  operatorId?: string | number;

  /**
   * 机构全称
   */
  operatorName?: string;

  /**
   * 运营商电话1
   */
  operatorTel1?: string;

  /**
   * 运营商电话2
   */
  operatorTel2?: string;

  /**
   * 运营商注册地址
   */
  operatorRegAddress?: string;

  /**
   * 备注信息
   */
  operatorNote?: string;

  /**
   * 运营商国标接口http请求前缀，以/结尾
   */
  host?: string;

  /**
   * 运营商密钥0-F字符组成,可采用32H、48H、64H
   */
  operatorSecret?: string;

  /**
   * 消息密钥
   */
  dataSecret?: string;

  /**
   * 消息密钥初始化向量 固定16位 用户AES加密过程的混合加密
   */
  dataSecretIv?: string;

  /**
   * 签名密钥0-F字符组成,可采用32H、48H、64H 为签名的加密密钥
   */
  sigSecret?: string;

  /**
   * 用户平台我方组织机构编码
   */
  myOperatorId?: string | number;

  /**
   * 用户平台密钥
   */
  userOperatorSecret?: string;

  /**
   * 用户平台消息密钥
   */
  userDataSecret?: string;

  /**
   * 用户平台消息密钥初始化向量
   */
  userDataSecretIv?: string;

  /**
   * 用户平台签名密钥
   */
  userSigSecret?: string;

  /**
   * 创建人ID
   */
  createById?: string | number;

  /**
   * 更新人ID
   */
  updateById?: string | number;

}

/**查询运营商请求 */
export interface OperatorQuery extends PageQuery {

  /*用户平台运营商ID*/
  operatorId?: string | number;

  /**
   * 用户平台运营商名称
   */
  operatorName?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}
