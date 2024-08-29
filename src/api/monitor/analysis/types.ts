export interface BillVO {
  /**
   *
   */
  id: string | number;

  /**
   * 运营商ID（组织机构代码）
   */
  operatorId: string | number;

}


export interface analysisQuery extends PageQuery {

  /*用户平台运营商ID*/
  operatorId?: string | number;

  /*机构全称*/
  operatorName?: string;

  /*日期范围参数*/
  params?: any;
}

/**站点全量统计查询请求 */
export interface StationStatsQuery {
  /**统计方式 0日 1月 2年 3自定义*/
  type?: string;

  /**充电站ID*/
  stationId?: string | number;

  /**开始日期/指定日期 yyyy-MM-dd*/
  startTm?: string | Date;

  /**结束日期 yyyy-MM-dd*/
  endTm?: string | Date;

  /**运营商ID*/
  operatorId?: string | number;
}
/**站点全量统计响应 */
export interface StationStatsDataVO {
  /**充电电量*/
  totalPower: string;

  /**订单总额*/
  totalMoney: string;

  /**电费总额*/
  totalEMoney: string;

  /**服务费总额*/
  totalSMoney: string;

  /**订单数*/
  orderCount: string | number;

  /**平均客单价*/
  avo: string;

  /**充电时长*/
  totalDurant: string;

  /**总用户数（去重）*/
  totalUserCount: string | number;

  /**充电金额曲线图*/
  chargeMoneyList: StatsUnitVO[];

  /**服务费金额曲线图*/
  serMoneyList: StatsUnitVO[];

  /**电费金额曲线图*/
  eleMoneyList: StatsUnitVO[];

  /**充电次数曲线图*/
  chargeCountList: StatsUnitVO[];

  /**充电度数曲线图*/
  chargePowerList: StatsUnitVO[];

  /**充电金额分布图*/
  chargeMoneyPieList: StatsUnitVO[];

  /**充电时长*/
  chargeDurantList: StatsUnitVO[];
}
/**统计单元 */
export interface StatsUnitVO {
  /**时间戳*/
  tm: string;

  /**值*/
  value: string;

  /**单位*/
  unit: string;
}
/**充电桩充电监控概览 */
export interface StatsForConnectorVO {
  /**站点名称 */
  stationName: string;
  /**充电枪总数 */
  connectorCount: string | number;
  /**空闲数量 */
  freeCount: string | number;
  /**插枪数量 */
  unChargingCount: string | number;
  /**充电中数量 */
  chargingCount: string | number;
  /**离线数量 */
  offlineCount: string | number;
  /**故障数量 */
  breakDownCount: string | number;
  /**未知原因数量 */
  unkownCount: string | number;
  /**充电枪统计列表 */
  connectorList: StatsForConnectorDataVO[];
}
/**充电桩充电监控明细 */
export interface StatsForConnectorDataVO {
  /** 充电站Id */
  stationId: string | number;

  /**充电桩Id*/
  equipmentId: string | number;

  /**充电枪Id*/
  connectorId: string | number;

  /**充电枪状态 0、离网;1、空闲;2、占用(未充电);3、占用(充电中);4、占用(预约锁定);255、故障*/
  connectorStatus: string | number;

  /**电流*/
  currentA: string | number;

  /**电压*/
  voltageA: string | number;

  /**电池剩余电量(默认:0)*/
  soc: string | number;

  /**充电量*/
  chargePower: string | number;

  /**充电中的订单号*/
  startChargeSeq: string | number;

  /**统计日充电数量*/
  chargeCount: string | number;

  /**统计日总充电量*/
  totalPower: string | number;

  /**统计日总充电时长*/
  totalChargeDura: string | number;
}
