export interface OrderVO {
  /**
   *
   */
  id: string | number;

  /**
   * 充电订单号：运营商ID+唯一编号 27个字符； 组织机构9位+id18位
   */
  startChargeSeq: string;

  /**
   * 运营商ID
   */
  operatorId: string | number;

  /**
   * 交易流水号（基础平台和桩的规则 32位 16位BCD）
   */
  tradeNo: string;

  /**
   * 充电订单状态；1启动中 2充电中 3停止中 4已结束 5未知
   */
  startChargeSeqStat: number;

  /**
   * 关联充电站ID，运营商自定义的唯一编码 小于等于20字符
   */
  stationId: string | number;

  /**
   * 充电设备接口编码
   */
  connectorId: string | number;

  /**
   * 1空闲 2占用（未充电） 3占用（充电中） 4占用（预约锁定） 255故障
   */
  connectorStatus: number;

  /**
   * A相电流 单位A 默认0，含直流（输出）
   */
  currentA: number;

  /**
   * B相电流
   */
  currentB: number;

  /**
   * C相电流
   */
  currentC: number;

  /**
   * A相电压 单位V 默认0，含直流（输出）
   */
  voltageA: number;

  /**
   * B相电压
   */
  voltageB: number;

  /**
   * C相电压
   */
  voltageC: number;

  /**
   * 电池剩余电量0-1.00
   */
  soc: number;

  /**
   * 开始充电时间
   */
  startTime: string;

  /**
   * 最新采样时间
   */
  endTime: string;

  /**
   * 累计充电量（度）
   */
  totalPower: number;

  /**
   * 累计电费（元）
   */
  elecMoney: number;

  /**
   * 累计服务费（元）
   */
  serviceMoney: number;

  /**
   * 累计总金额（元）
   */
  totalMoney: number;

  /**
   * 时段数0-32；实际约定为1-24时段，小时为单位
   */
  sumPeriod: number;

  /**
   * 故障原因 0无 1此设备不存在 2此设备离线 3设备已停止充电 4-99自定义（参考12.1 充电停止原因代码表）
   */
  failReason: number;

  /**
   * vin码
   */
  carVin: string;

  /**
   * 订单结束后是否已和用户平台同步 0否 1是
   */
  syncFlag: number;

  /**
   * 是否已上报至市政平台
   */
  reportGov: number;

  /**
   * 车牌号
   */
  plateNum: string;

  /**
   * 手机号
   */
  phoneNum: string;

  /**
   * 下单时计价
   */
  priceInfo: string;
}

export interface OrderItemVO {
/**
   *
   */
id: string | number;

/**
 * 充电订单号
 */
startChargeSeq: string;

/**
 * 开始时间 yyyy-MM-dd HH:mm:ss
 */
startTime: string;

/**
 * 结束时间 yyyy-MM-dd HH:mm:ss
 */
endTime: string;

/**
 * 时段电价 小数点后4位
 */
elecPrice: number;

/**
 * 时段服务费价格 小数点后4位
 */
servicePrice: number;

/**
 * 时段充电量 度 小数点后2位
 */
power: number;

/**
 * 时段电费 小数点后2位
 */
elecMoney: number;

/**
 * 时段服务费 小数点后2位
 */
serviceMoney: number;
}

export interface OrderForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 充电订单号：运营商ID+唯一编号 27个字符； 组织机构9位+id18位
   */
  startChargeSeq?: string;

  /**
   * 运营商ID
   */
  operatorId?: string | number;

  /**
   * 交易流水号（基础平台和桩的规则 32位 16位BCD）
   */
  tradeNo?: string;

  /**
   * 充电订单状态；1启动中 2充电中 3停止中 4已结束 5未知
   */
  startChargeSeqStat?: number;

  /**
   * 关联充电站ID，运营商自定义的唯一编码 小于等于20字符
   */
  stationId?: string | number;

  /**
   * 充电设备接口编码
   */
  connectorId?: string | number;

  /**
   * 1空闲 2占用（未充电） 3占用（充电中） 4占用（预约锁定） 255故障
   */
  connectorStatus?: number;

  /**
   * A相电流 单位A 默认0，含直流（输出）
   */
  currentA?: number;

  /**
   * B相电流
   */
  currentB?: number;

  /**
   * C相电流
   */
  currentC?: number;

  /**
   * A相电压 单位V 默认0，含直流（输出）
   */
  voltageA?: number;

  /**
   * B相电压
   */
  voltageB?: number;

  /**
   * C相电压
   */
  voltageC?: number;

  /**
   * 电池剩余电量0-1.00
   */
  soc?: number;

  /**
   * 开始充电时间
   */
  startTime?: string;

  /**
   * 最新采样时间
   */
  endTime?: string;

  /**
   * 累计充电量（度）
   */
  totalPower?: number;

  /**
   * 累计电费（元）
   */
  elecMoney?: number;

  /**
   * 累计服务费（元）
   */
  serviceMoney?: number;

  /**
   * 累计总金额（元）
   */
  totalMoney?: number;

  /**
   * 时段数0-32；实际约定为1-24时段，小时为单位
   */
  sumPeriod?: number;

  /**
   * 故障原因 0无 1此设备不存在 2此设备离线 3设备已停止充电 4-99自定义（参考12.1 充电停止原因代码表）
   */
  failReason?: number;

  /**
   * vin码
   */
  carVin?: string;

  /**
   * 订单结束后是否已和用户平台同步 0否 1是
   */
  syncFlag?: number;

  /**
   * 是否已上报至市政平台
   */
  reportGov?: number;

  /**
   * 车牌号
   */
  plateNum?: string;

  /**
   * 手机号
   */
  phoneNum?: string;

  /**
   * 下单时计价
   */
  priceInfo?: string;
}

/**查询充电订单请求 */
export interface OrderChargeQuery extends PageQuery {

  /*充电接口ID*/
  connectorId?: string | number;
  /*运营商ID*/
  operatorId?: string | number;
  /*充电站ID*/
  stationId?: string | number;
  /*充电订单号*/
  startChargeSeq?: string;
  /*充电订单状态；1启动中 2充电中 3停止中 4已结束 5未知*/
  startChargeSeqStat?: string | number;
  /*订单创建时间查询起始时间*/
  startTm?: string | Date;
  /*订单创建时间查询结束时间*/
  endTm?: string | Date;
  /*车VIN*/
  carVin?: string;
  /*车牌*/
  plateNum?: string;
  /*手机*/
  phoneNum?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}
/**充电明细信息体 */
export interface OrderChargeDetailVO {
  /**开始时间，格式“yyyy-MM-dd HH:mm:ss” */
  detailStartTime: string | Date;
  /**结束时间，格式“yyyy-MM-dd HH:mm:ss” */
  detailEndTime: string | Date;
  /**时段电价 */
  elecPrice: string;
  /**时段服务费价格 */
  sevicePrice: string;
  /**时段充电量 */
  detailPower: string;
  /**时段电费 */
  detailElecMoney: string;
  /**时段服务费 */
  detailSeviceMoney: string;
}
/**单项订单对账信息体 */
export interface OrderChargeOrderVO {
  /**充电订单号 */
  startChargeSeq: string;
  /**累计充电量 */
  totalPower: string;
  /**累计总金额 */
  totalMoney: string;
}
/**单项争议交易信息体 */
export interface OrderDisputeChargeOrderVO {
  /**充电订单号 */
  startChargeSeq: string;
  /**累计充电量 */
  totalPower: string;
  /**累计总金额 */
  totalMoney: string;
  /**争议原因，1:交易不存在;2：交易金额错误;3：交易电量错误;4～99：自定义 */
  disputeReason: string;
}
/**单项业务策略信息体 */
export interface OrderPolicyVO {
  /**时段起始时间点HHmmss */
  startTime: string;
  /**时段电费，小数点后4位 */
  elecPrice: string;
  /**时段服务费，小数点后4位 */
  sevicePrice: string;
  /**电费类型 0尖1峰2平3谷 */
  priceType: string;
}

/**推送停止充电结果 */
// export interface StopChargeResult {
//     /**
//      * 充电订单号
//      */
//     startChargeSeq: string;

//     /**
//      * 充电订单状态，1启动中 2充电中 3停止中 4已结束 5未知
//      */
//     startChargeSeqStat: string;

//     /**
//      * 充电设备接口编码
//      */
//     connectorID: string | number;

//     /**
//      * 成功标识，0成功 1失败
//      */
//     succStat: string;

//     /**
//      * 停止失败原因,0无 1此设备不存在 2此设备离线 3设备已停止充电 4-99自定义
//      */
//     failReason: string;
// }
