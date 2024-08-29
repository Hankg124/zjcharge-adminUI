export interface ExportVO {
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


export interface ExportQuery extends PageQuery {

  /*用户平台运营商ID*/
  operatorId?: string | number;

  /**
   * 机构全称
   */
  operatorName?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}
