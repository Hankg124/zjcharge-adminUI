export interface ConnectorVO {
  /**
   * 充电站Id
   */
  stationId: string | number;

  /**
   * 充电桩Id
   */
  equipmentId: string | number;

  /**
   * 充电枪Id
   */
  connectorId: string | number;

  /**
   * 充电枪状态 0、离网;1、空闲;2、占用(未充电);3、占用(充电中);4、占用(预约锁定);255、故障
   */
  connectorStatus: string | number;

  /**
   * 电流
   */
  currentA: string | number;

  /**
   * 电压
   */
  voltageA: string | number;

  /**
   * 电池剩余电量(默认:0)
   */
  soc: string | number;

  /**
   * 充电量
   */
  chargePower: string | number;

  /**
   * 充电中的订单号
   */
  startChargeSeq: string | number;

  /**
   * 统计日充电数量
   */
  chargeCount: string | number;

  /**
   * 统计日总充电量
   */
  totalPower: string | number;

  /**
   * 统计日总充电时长
   */
  totalChargeDura: string | number;

}

/**
 * 充电设备接口信息
 */
export interface ConnectorInfoVO {
  /**
   * 充电设备接口编码
   */
  connectorID: number | string;

  /**
   * 充电设备接口名称
   */
  connectorName: string;

  /**
   * 充电设备接口类型，1家用插座，2交流接口插座，3交流接口插头，4直流接口枪头，5无线充电座，6其他
   */
  connectorType: number | string;

  /**
   * 额定电压上限
   */
  voltageUpperLimits: number | string;

  /**
   * 额定电压下限
   */
  voltageLowerLimits: number | string;

  /**
   * 额定电流
   */
  current: number | string;

  /**
   * 额定功率
   */
  power: string;

  /**
   * 国家标准 1、2011 2、2015
   */
  nationalStandard: number | string;
}

/**
 * 充电设备接口统计信息
 */
export interface ConnectorStatsInfoVO {
  /**
   * 充电设备接口编码
   */
  connectorID: number | string;
  /**
   * 充电设备接口累计电量
   */
  connectorElectricity: string;
}

/**
 * 充电设备接口状态信息
 */
export interface ConnectorStatusInfoVO {
  /**
   * 充电设备接口编码
   */
  connectorID: string | number;
  /**
   * 充电设备接口状态 0离网，1空闲，2占用（未充电）3占用（充电中）4占用（预约锁定）255故障
   */
  status: string | number;
  /**
   * 车位状态 0未知 10空闲 50占用
   */
  parkStatus: string | number;
  /**
   * 地锁状态 0未知 10已解锁 50已上锁
   */
  lockStatus: string | number;
}

export interface ConnectorForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 充电设备接口编码，同一运营商内唯一；9位组织机构编码+14桩编码+3枪号
   */
  connectorId?: string | number;

  /**
   * 关联的设备ID，对同一运营商保证唯一
   */
  equipmentId?: string | number;

  /**
   * 枪号
   */
  gunNo?: string;

  /**
   * 充电设备接口名称
   */
  connectorName?: string;

  /**
   * 1家用插座 2交流接口插座 3交流接口插头 4直流接口枪头 5无线充电座 6其他
   */
  connectorType?: number;

  /**
   * 额定电压上限
   */
  voltageUpperLimits?: number;

  /**
   * 额定电压下限
   */
  voltageLowerLimits?: number;

  /**
   * 额定电流
   */
  currentValue?: number;

  /**
   * 额定功率
   */
  power?: number;

  /**
   * 车位号
   */
  parkNo?: string;

  /**
   * 国家标准 1:2011 2:2015
   */
  nationalStandard?: number;

  /**
   * 0离网 1空闲 2占用（未充电）3占用（充电）4占用（预约锁定）255故障
   */
  status?: string;

  /**
   * 0未知 10空闲 50占用
   */
  parkStatus?: string;

  /**
   * 0未知 10已解锁 50已上锁
   */
  lockStatus?: string;

  /**
   * 价格模版ID
   */
  priceCode?: string;

  /**
   * 0正常 1故障
   */
  state?: string;

  /**
   * 最后一次心跳时间，超过40秒视为离线
   */
  pingTm?: string;

  /**
   * 创建人ID
   */
  createById?: string | number;

  /**
   * 更新人ID
   */
  updateById?: string | number;

}
/**
 * 查询充电接口请求
 */
export interface ConnectorQuery extends PageQuery {

  /**
   * 充电接口ID
   */
  connectorId: string | number;

  /**
   * 所属充电设备ID
   */
  equipmentId: string | number;

  /**
   * 充电接口名称
   */
  connectorName: string;

  /**
   * 状态 0离网 1空闲 2占用（未充电）3占用（充电）4占用（预约锁定）255故障
   */
  status: string | number;

  /**
   * 正常标记 0正常 1故障
   */
  state: string | number;

  /**
   * 日期范围参数
   */
  params?: any;
}
/**
 * 查询充电接口状态记录请求
 **/
export interface ConnectorStatusQuery extends PageQuery {
  /**
   * 充电接口ID
   */
  connectorId: string | number;

  /**
   * 起始-创建时间
   */
  startTm?: Date | string;

  /**
   * 结束-创建时间
   */
  endTm?: Date | string;

  /**
   * 充电订单号
   */
  startChargeSeq: string;

}
