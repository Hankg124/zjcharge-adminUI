import { ConnectorStatusInfoVO } from "../connector/types";
import { EquipmentInfoVO, EquipmentStatsInfoVO } from "../equipment/types";

export interface PVStorageVO {
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
}

export interface StationVO {
  /**
   *
   */
  id: string | number;

  /**
   * 充电站ID，运营商自定义的唯一编码 小于等于20字符
   */
  stationId: string | number;

  /**
   * 运营商ID
   */
  operatorId: string | number;

  /**
   * 设备所属方ID，设备所属运营平台组织机构代码
   */
  equipmentOwnerId: string | number;

  /**
   * 充电站名称
   */
  stationName: string;

  /**
   * 充电站国家代码
   */
  countryCode: string;

  /**
   * 充电站省市辖区编码 20个字符
   */
  areaCode: string;

  /**
   * 详细地址
   */
  address: string;

  /**
   * 站点电话 小于30字符
   */
  stationTel: string;

  /**
   * 服务电话 小于30字符
   */
  serviceTel: string;

  /**
   * 1公共 50个人 100公交 101环卫 102物流 103出租车 255其他
   */
  stationType: number;

  /**
   * 0未知 1建设中 5关闭下线 6维护中 50正常使用
   */
  stationStatus: number;

  /**
   * 车位数量 0未知
   */
  parkNums: number;

  /**
   * 经度 保留小数点后6位
   */
  stationLng: number;

  /**
   * 纬度 保留小数点后6位
   */
  stationLat: number;

  /**
   * 站点引导
   */
  siteGuide: string | number;

  /**
   * 建设场所
   */
  construction: number;

  /**
   * 充电设备照片、充电车位照片、停车场入口照片，字符串数组
   */
  pictures: string;

  /**
   * 使用车型描述，描述该站点接受的车大小及类型，如大车、物流车、私家乘用车、出租车等
   */
  matchCars: string;

  /**
   * 车位楼层及数量描述，车位楼层以及数量信息
   */
  parkInfo: string;

  /**
   * 营业时间描述
   */
  businessHours: string;

  /**
   *
   */
  createById: string | number;

  /**
   *
   */
  updateById: string | number;

  /**
   * 充电费率
   */
  electricityFee: string;

  /**
   * 服务费率
   */
  serviceFee: string;

  /**
   * 停车费
   */
  parkFee: string;

  /**
   * 支付方式：刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡】微信/支付宝、APP为线上
   */
  payment: string;

  /**
   * 充电设备是否需要提前预约后才能使用。0为不支持预约；1为支持预约。默认0
   */
  supportOrder: number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 是否需要上报市政平台（0否 其他为平台编号）
   */
  reportGovFlag: string;

  /**
   * 是否已上报至政府平台
   */
  reportGov: number;

  /**
   * 是否独立报装 0否 1是；如果是独立报桩，需要填写户号以及容量
   */
  isAloneApply: number;

  /**
   * 户号：国网电费账单户号(小于20字符)
   */
  accountNumber: string;

  /**
   * 容量：独立电表申请的功率（保留小数点后4位）
   */
  capacity: number;

  /**
   * 是否是公共停车场库0否1是；如果是则需要填写场库编号
   */
  isPublicParkingLot: number;

  /**
   * 公共停车场库编号(小于20字符)
   */
  parkingLotNumber: string;

  /**
   * 是否全天开放0否1是
   */
  openAllDay: number;

  /**
   * 是否停车免费0否1是
   */
  parkFree: number;

  /**
   * 二进制，每一位代表一个信号量，从低位开始，1位卫生间，2位便利店，3位餐厅，4位休息室，5位雨棚，6位小票即，7位道闸，8位地锁
   */
  unitFlag: number;

  /**
   * 最低充电电费率
   */
  minElectricityPrice: number;

  /**
   * 0停车收费1停车免费2限时免费3充电限免
   */
  parkFeeType: number;

  /**
   * 每度电综合补贴单价
   */
  subsidyPerKwh: string | number;

  /**
   * 站点年最大补贴金额
   */
  subsidyYearMax: string | number;

  /**
   * 订单补贴，空：不补贴；1全补贴；运营商ID，补贴，多运营商逗号分隔
   */
  subsidyOperator: string | number;

}

/**站点价格信息 */
export interface StationFeeInfoVO {
  /**时段起始时间点:时分（例：00:00） */
  startTime: string;
  /**时段结束时间点:时分（例：23:59） */
  endTime: string;
  /**时段电费:浮点型，小数点后2位 */
  electricityFee: string;
  /**时段服务费:浮点型，小数点后2位 */
  serviceFee: string;
  /**设备类型：1：直流设备2：交流设备3：交直流一体设备 */
  equipmentType: string | number;
}
/**充电站信息 */
export interface StationInfoVO {
  /**
   * 充电站ID，运营商自定义的唯一编码 小于等于20字符
   */
  stationId: string | number;

  /**
   * 运营商ID
   */
  operatorId: string | number;

  /**
   * 设备所属方ID，设备所属运营平台组织机构代码
   */
  equipmentOwnerId: string | number;

  /**
   * 充电站名称
   */
  stationName: string;

  /**
   * 充电站国家代码
   */
  countryCode: string;

  /**
   * 充电站省市辖区编码 20个字符
   */
  areaCode: string;

  /**
   * 详细地址
   */
  address: string;

  /**
   * 站点电话 小于30字符
   */
  stationTel: string;

  /**
   * 服务电话 小于30字符
   */
  serviceTel: string;

  /**
   * 1公共 50个人 100公交 101环卫 102物流 103出租车 255其他
   */
  stationType: number;

  /**
   * 0未知 1建设中 5关闭下线 6维护中 50正常使用
   */
  stationStatus: number;

  /**
   * 车位数量 0未知
   */
  parkNums: number;

  /**
   * 经度 保留小数点后6位
   */
  stationLng: number;

  /**
   * 纬度 保留小数点后6位
   */
  stationLat: number;

  /**
   * 站点引导
   */
  siteGuide: string | number;

  /**
   * 建设场所
   */
  construction: number;

  /**
   * 充电设备照片、充电车位照片、停车场入口照片，字符串数组
   */
  pictures: string;

  /**
   * 使用车型描述，描述该站点接受的车大小及类型，如大车、物流车、私家乘用车、出租车等
   */
  matchCars: string;

  /**
   * 车位楼层及数量描述，车位楼层以及数量信息
   */
  parkInfo: string;

  /**
   * 营业时间描述
   */
  businessHours: string;

  /**
   * 充电费率
   */
  electricityFee: string;

  /**
   * 服务费率
   */
  serviceFee: string;

  /**
   * 停车费
   */
  parkFee: string;

  /**
   * 支付方式：刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡】微信/支付宝、APP为线上
   */
  payment: string;

  /**
   * 充电设备是否需要提前预约后才能使用。0为不支持预约；1为支持预约。默认0
   */
  supportOrder: number;

  /**
   * 备注
   */
  remark: string;

  /**充电设备信息列表 */
  equipmentInfos?: EquipmentInfoVO[];

}
/**充电站统计信息 */
export interface StationStatsInfoVO {
  /**充电站ID */
  stationID: string | number;
  /**统计开始时间 格式 yyyy-MM-dd */
  startTime: string | Date;
  /**统计结束时间 格式 yyyy-MM-dd */
  endTime: string | Date;
  /**充电站累计电量，单位位kWh，精度位0.1 */
  stationElectricity: string;
  /**充电设备统计信息列表 */
  equipmentStatsInfos?: EquipmentStatsInfoVO[];
}
/**充电站状态 */
export interface StationStatusInfoVO {
  /**充电站ID */
  stationID: string | number;
  /**充电设备接口状态列表 */
  connectorStatusInfos?: ConnectorStatusInfoVO[];
}

export interface StationForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 充电站ID，运营商自定义的唯一编码 小于等于20字符
   */
  stationId?: string | number;

  /**
   * 运营商ID
   */
  operatorId?: string | number;

  /**
   * 设备所属方ID，设备所属运营平台组织机构代码
   */
  equipmentOwnerId?: string | number;

  /**
   * 充电站名称
   */
  stationName?: string;

  /**
   * 充电站国家代码
   */
  countryCode?: string;

  /**
   * 充电站省市辖区编码 20个字符
   */
  areaCode?: string;

  /**
   * 详细地址
   */
  address?: string;

  /**
   * 站点电话 小于30字符
   */
  stationTel?: string;

  /**
   * 服务电话 小于30字符
   */
  serviceTel?: string;

  /**
   * 1公共 50个人 100公交 101环卫 102物流 103出租车 255其他
   */
  stationType?: number;

  /**
   * 0未知 1建设中 5关闭下线 6维护中 50正常使用
   */
  stationStatus?: number;

  /**
   * 车位数量 0未知
   */
  parkNums?: number;

  /**
   * 经度 保留小数点后6位
   */
  stationLng?: number;

  /**
   * 纬度 保留小数点后6位
   */
  stationLat?: number;

  /**
   * 站点引导
   */
  siteGuide?: string | number;

  /**
   * 建设场所
   */
  construction?: number;

  /**
   * 充电设备照片、充电车位照片、停车场入口照片，字符串数组
   */
  pictures?: string;

  /**
   * 使用车型描述，描述该站点接受的车大小及类型，如大车、物流车、私家乘用车、出租车等
   */
  matchCars?: string;

  /**
   * 车位楼层及数量描述，车位楼层以及数量信息
   */
  parkInfo?: string;

  /**
   * 营业时间描述
   */
  businessHours?: string;

  /**
   *
   */
  createById?: string | number;

  /**
   *
   */
  updateById?: string | number;

  /**
   * 充电费率
   */
  electricityFee?: string;

  /**
   * 服务费率
   */
  serviceFee?: string;

  /**
   * 停车费
   */
  parkFee?: string;
  /**
   * 支付方式：刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡】微信/支付宝、APP为线上
   */
  payment?: string;

  /**
   * 充电设备是否需要提前预约后才能使用。0为不支持预约；1为支持预约。默认0
   */
  supportOrder?: number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 是否需要上报市政平台（0否 其他为平台编号）
   */
  reportGovFlag?: string;

  /**
   * 是否已上报至政府平台
   */
  reportGov?: number;

  /**
   * 是否独立报装 0否 1是；如果是独立报桩，需要填写户号以及容量
   */
  isAloneApply?: number;

  /**
   * 户号：国网电费账单户号(小于20字符)
   */
  accountNumber?: string;

  /**
   * 容量：独立电表申请的功率（保留小数点后4位）
   */
  capacity?: number;

  /**
   * 是否是公共停车场库0否1是；如果是则需要填写场库编号
   */
  isPublicParkingLot?: number;

  /**
   * 公共停车场库编号(小于20字符)
   */
  parkingLotNumber?: string;

  /**
   * 是否全天开放0否1是
   */
  openAllDay?: number;

  /**
   * 是否停车免费0否1是
   */
  parkFree?: number;

  /**
   * 二进制，每一位代表一个信号量，从低位开始，1位卫生间，2位便利店，3位餐厅，4位休息室，5位雨棚，6位小票即，7位道闸，8位地锁
   */
  unitFlag?: number;

  /**
   * 最低充电电费率
   */
  minElectricityPrice?: number;

  /**
   * 0停车收费1停车免费2限时免费3充电限免
   */
  parkFeeType?: number;

  /**
   * 每度电综合补贴单价
   */
  subsidyPerKwh?: string | number;

  /**
   * 站点年最大补贴金额
   */
  subsidyYearMax?: string | number;

  /**
   * 订单补贴，空：不补贴；1全补贴；运营商ID，补贴，多运营商逗号分隔
   */
  subsidyOperator?: string | number;

}

/**
 * 查询统计信息
 */
export interface StationStatsQuery {
  /**
   *充电站ID
   */
  stationID?: string | number;

  /**
   * 统计开始时间，格式yyyy-MM-dd
   */
  startTime?: string | Date;

  /**
   * 统计结束时间，格式yyyy-MM-dd
   */
  endTime?: string | Date;
}

/**查询充电站请求 */
export interface StationQuery extends PageQuery {
  /**
   * 站点ID
   */
  stationId?: string | number;

  /**
   * 站点名
   */
  stationName?: string;

  /**运营商ID */
  operatorId?: string | number;

  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 地区域码
   */
  areaCode?: string;
  /**
   * 地区域码
   */
  address?: string;
  /**
   * 地区域码
   */
  stationType?: string | number;

  /**
   * 设备所有者ID
   */
  equipmentOwnerId?: string | number;

  /**
   * 站点状态：0、未知;1、建设中;5、关闭下线;6、维护中;50、正常使用
   */
  stationStatus?: string | number;

  /**
   * 日期范围参数
   */
  params?: any;
}
