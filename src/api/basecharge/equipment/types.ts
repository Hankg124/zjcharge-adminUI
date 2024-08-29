import { ConnectorInfoVO, ConnectorStatsInfoVO } from '../connector/types';

export interface EquipmentVO {
  /**
   *
   */
  id: string | number;

  /**
   * 设备唯一编码，对同一运营商保证唯一；9组织机构+14桩编号
   */
  equipmentId: string | number;

  /**
   * 桩编号
   */
  pileNo: string;

  /**
   * 关联充电站ID，运营商自定义的唯一编码 小于等于20字符
   */
  stationId: string | number;

  /**
   * 价格模版ID
   */
  priceCode: string;

  /**
   * 设备生产商组织机构代码
   */
  manufacturerId: string | number;

  /**
   * 设备生产商名称
   */
  manufacturerName: string;

  /**
   * 设备型号
   */
  equipmentModel: string;

  /**
   * 设备生产日期
   */
  productionDate: string;

  /**
   * 1直流设备 2交流设备 3交直流一体设备 4无线设备 5其他
   */
  equipmentType: number;

  /**
   * 充电设备经度
   */
  equipmentLng: number;

  /**
   * 充电设备纬度
   */
  equipmentLat: number;

  /**
   * 充电设备总功率kW 保留小数点后1位
   */
  power: number;

  /**
   * 充电桩最大允许输出功率 30%-100% 1Bin表示1%
   */
  maxPower: number;

  /**
   * 是否启用 0 正常工作 1停止使用锁定
   */
  isWorking: string;

  /**
   * 最近对时时间
   */
  syncTm: string;

  /**
   * 充电设备名称
   */
  equipmentName: string;

  /**
   * 0、sim卡 1、LAN 2、WAN 3其他
   */
  netType: string;

  /**
   * 0移动 2电信 3联通 4其他
   */
  mOperator: number;

  /**
   * 最近上线时间（登录验证）
   */
  onlineTm: string;

  /**
   * 连接主机IP
   */
  servIp: string;

  /**
   * 创建人ID
   */
  createById: string | number;

  /**
   * 更新人ID
   */
  updateById: string | number;
}

/**
 * 充电设备信息
 */
export interface EquipmentInfoVO {
  /**
   * 设备ID
   */
  equipmentID: number | string;

  /**
   * 设备生产商组织机构代码
   */
  manufacturerID: number | string;

  /**
   * 设备型号
   */
  equipmentModel: string;

  /**
   * 设备生产日期
   */
  productionDate: string | Date;

  /**
   * 设备类型，1直流设备，2交流设备，3交直流一体设备，4无线设备，5其他
   */
  equipmentType: string | number;

  /** 充电设备接口信息列表 */
  connectorInfos?: ConnectorInfoVO[];

  /**
   * 充电设备总功率
   */
  power: string;

  /**
   * 充电设备名称
   */
  equipmentName: string;
}
/**
 * 充电设备统计信息
 */
export interface EquipmentStatsInfoVO {
  /**
   * 设备编码
   */
  equipmentID: string | number;
  /**
   * 充电设备接口累计电量，累计电量，单位为kWh，精度为0.1
   */
  equipmentElectricity: string;
  /**
   * 充电设备接口统计信息列表
   */
  connectorStatsInfos?: ConnectorStatsInfoVO[];
}

export interface EquipmentForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 设备唯一编码，对同一运营商保证唯一；9组织机构+14桩编号
   */
  equipmentId?: string | number;

  /**
   * 桩编号
   */
  pileNo?: string;

  /**
   * 关联充电站ID，运营商自定义的唯一编码 小于等于20字符
   */
  stationId?: string | number;

  /**
   * 价格模版ID
   */
  priceCode?: string;

  /**
   * 设备生产商组织机构代码
   */
  manufacturerId?: string | number;

  /**
   * 设备生产商名称
   */
  manufacturerName?: string;

  /**
   * 设备型号
   */
  equipmentModel?: string;

  /**
   * 设备生产日期
   */
  productionDate?: string;

  /**
   * 1直流设备 2交流设备 3交直流一体设备 4无线设备 5其他
   */
  equipmentType?: number;

  /**
   * 充电设备经度
   */
  equipmentLng?: number;

  /**
   * 充电设备纬度
   */
  equipmentLat?: number;

  /**
   * 充电设备总功率kW 保留小数点后1位
   */
  power?: number;

  /**
   * 充电桩最大允许输出功率 30%-100% 1Bin表示1%
   */
  maxPower?: number;

  /**
   * 是否启用 0 正常工作 1停止使用锁定
   */
  isWorking?: string;

  /**
   * 最近对时时间
   */
  syncTm?: string;

  /**
   * 充电设备名称
   */
  equipmentName?: string;

  /**
   * 0、sim卡 1、LAN 2、WAN 3其他
   */
  netType?: string;

  /**
   * 0移动 2电信 3联通 4其他
   */
  mOperator?: number;

  /**
   * 最近上线时间（登录验证）
   */
  onlineTm?: string;

  /**
   * 连接主机IP
   */
  servIp?: string;

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
 * 充电桩查询请求
 */
export interface EquipmentQuery extends PageQuery {
  /*充电设备ID*/
  equipmentId?: string | number;

  /*充电桩编号*/
  pileNo?: string;

  /*充电站ID*/
  stationId?: string | number;

  /**
   * 充电设备类型 1直流设备 2交流设备 3交直流一体设备 4无线设备 5其他
   */
  equipmentType?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
