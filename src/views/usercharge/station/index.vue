<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryForm" :model="queryParams" :inline="true">
            <el-form-item label="站点名称" prop="stationName">
              <el-input v-model="queryParams.stationName" placeholder="请输入站点名称" clearable @keyup.enter.native="doSearch" />
            </el-form-item>
            <el-form-item label="所属基础运营商" prop="operatorId" label-width="110px">
              <SelectOperator v-model="queryParams.operatorId" :show-item-all="true" :clearable="true" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="doSearch">搜索</el-button>
              <el-button icon="Refresh" @click="doReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>
    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">站点数据由基础设施平台同步而来，如需创建请联系站点的基础设施运营商。</el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="fetchList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stationList" @selection-change="doSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="stationId" label="站点ID" width="120" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stationName" label="站点名称" :show-overflow-tooltip="true">
          <template #default="scope">
            <el-link @click="doEdit(scope.row)">
              <span>{{ scope.row.stationName }}</span>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentCount" label="充电桩" width="80" align="right">
          <template #default="scope">
            <router-link :to="'/usercharge/equipment?sId=' + scope.row.stationId" class="link-type">
              <span>{{ scope.row.equipmentCount }}</span>
              <i class="el-icon-arrow-right ml10"></i>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="connectorCount" label="充电枪头" width="80" align="center"></el-table-column>
        <el-table-column prop="areaCode" label="所属地区" width="150" align="center">
          <template #default="scope">{{ scope.row.areaCode | queryCityCode }}</template>
        </el-table-column>
        <el-table-column prop="operatorName" label="所属运营商" width="120" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stationStatus" label="状态" :formatter="statusFormat" width="80" align="center"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template #default="scope">
            <el-button type="text" icon="Edit" @click="doEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        :total="total"
        @pagination="fetchList()"
      />
    </el-card>

    <!-- 添加或修改站点对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" destroy-on-close append-to-body width="900px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane name="first" label="基础信息">
          <el-form ref="form" :model="form" label-width="120px" size="mini" disabled>
            <div class="f-des">基础信息由基础设施平台同步而来，不可修改。</div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="站点ID" prop="stationId">
                  <el-input v-model="form.stationId" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="基础设施运营商ID" prop="baseOperatorId" label-width="140px">
                  <el-input v-model="form.baseOperatorId" placeholder />
                  <div class="form-tip">设备所属基础设施运营商</div>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="客户归属运营商ID" prop="operatorId" label-width="140px">
                  <el-input v-model="form.operatorId" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="站点名称" prop="stationName">
                  <el-input v-model="form.stationName" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备所属方ID" prop="equipmentOwnerId">
                  <el-input v-model="form.equipmentOwnerId" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="国家地区" prop="countryCode">
                  <SelectCountry
                    v-model="form.countryCode"
                    :default-value="form.countryCode"
                    style="width: 100px; display: inline-block; margin-right: 10px"
                  />
                  <SelectCity v-model="form.areaCode" class="select-city" :default-value="form.areaCode" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="详细地址" prop="address">
                  <el-input v-model="form.address" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="站点电话" prop="stationTel">
                  <el-input v-model="form.stationTel" placeholder style="width: 120px" />
                  <div class="form-tip">场站工作人员的联系电话</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服务电话" prop="serviceTel">
                  <el-input v-model="form.serviceTel" placeholder style="width: 120px" />
                  <div class="form-tip">平台客服电话</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="站点类型" prop="stationType">
                  <el-select v-model="form.stationType" :popper-append-to-body="false">
                    <el-option
                      v-for="dict in stationTypeOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="Number(dict.dictValue)"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="站点状态" prop="stationStatus">
                  <el-select v-model="form.stationStatus" :popper-append-to-body="false">
                    <el-option
                      v-for="dict in stationStatusOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="Number(dict.dictValue)"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建设场所" prop="construction">
                  <el-select v-model="form.construction" :popper-append-to-body="false">
                    <el-option label="未知" :value="0"></el-option>
                    <el-option
                      v-for="dict in stationConstructionOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="Number(dict.dictValue)"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车位数量" prop="parkNums">
                  <el-input v-model="form.parkNums" placeholder />
                  <div class="form-tip">可停放充电车辆的车位总数。未知填0</div>
                </el-form-item>
              </el-col>
              <el-col v-if="form.openAllDay == 0" :span="24">
                <el-form-item label="营业时间" prop="businessHours">
                  <el-input v-model="form.businessHours" placeholder maxlength="100" show-word-limit type="textarea" :rows="2" />
                  <div class="form-tip">推荐格式：周一至周日 00:00-24:00</div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="经纬度">
                  <el-input-number
                    v-model="form.stationLng"
                    :controls="false"
                    :precision="6"
                    placeholder="经度"
                    style="width: 85px"
                  />&nbsp;&nbsp;,&nbsp;&nbsp;
                  <el-input-number v-model="form.stationLat" :controls="false" :precision="6" placeholder="纬度" style="width: 85px" />
                  <div class="amap-page-container"></div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="站点引导" prop="siteGuide">
                  <el-input v-model="form.siteGuide" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="站点图片" prop="pictures">
                  <upload v-model:file-list="imageFileList" type="0" multiple disabled></upload>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="使用车型描述" prop="matchCars">
                  <el-input v-model="form.matchCars" placeholder maxlength="100" show-word-limit type="textarea" :rows="2" />
                  <div class="form-tip">描述站点接受的车辆大小及类型，如大巴、物流车、私家车、出租车等</div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="充电费率" prop="electricityFee">
                  <el-input v-model="form.electricityFee" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="服务费率" prop="serviceFee">
                  <el-input v-model="form.serviceFee" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="停车费" prop="parkFee">
                  <el-input v-model="form.parkFee" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="是否支持预约" prop="supportOrder">
                  <el-radio-group v-model="form.supportOrder">
                    <el-radio :label="0">不支持</el-radio>
                    <el-radio :label="1">支持</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注" prop="remarks">
                  <el-input v-model="form.remarks" placeholder />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="third" label="充电价格" :lazy="true">
          <PriceForm :station-id="form.stationId" />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="doCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { listStation, getStation, delStation, addStation, updateStation, addStationExtend, updateStationExtend } from '@/api/facility/station';
import { getDicts } from '@/api/system/dict/data';
import { resetForm } from '@/utils/common';
import TreeSelect from '@/components/TreeSelect';
import IconSelect from '@/components/IconSelect';
import SelectCity from '@/components/common/SelectCity';
import SelectCountry from '@/components/common/SelectCountry';
import SelectAgent from '@/components/SelectAgent';
import SelectOperator from '@/components/SelectOperator';
import PriceForm from './components/-price';
import SelectTag from '@/components/SelectServiceTag';

export default {
  name: 'Station',
  components: { TreeSelect, IconSelect, SelectCity, SelectCountry, SelectAgent, SelectOperator, PriceForm, SelectTag },
  data() {
    let self = this;
    var validateOpenTime = (rule, value, callback) => {
      const openEndTime = self.formExtend.openEndTime;
      if (!isEmpty(value) && !isEmpty(openEndTime) && value >= openEndTime) {
        callback(new Error('开始时间必须小于结束时间'));
      } else {
        callback();
      }
    };
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 站点表格树数据
      stationList: [],
      total: 0,
      // 站点树选项
      stationOptions: [],
      // 弹出层选项
      dialog: {
        visable: false,
        title: ''
      },
      priceOpen: false,
      discountOpen: false,
      statusOptions: [],
      stationTypeOptions: [], //站点类型
      stationStatusOptions: [], //站点状态
      stationConstructionOptions: [], //站点建筑场所类型
      stationOperationStatusOptions: [], //站点运营状态
      serviceTagOptions: [], //预设的服务标签
      // 查询参数
      queryParams: {
        stationName: undefined,
        operatorId: '',
        areaCode: undefined,
        pageNum: 1,
        pageSize: 20
      },
      // 表单参数
      form: {},
      formExtend: {
        tagIdArray: []
      },
      imageFileList: [],
      // 表单校验
      rules: {
        stationId: [{ required: true, message: '站点Id不能为空', trigger: 'blur' }],
        stationName: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }]
      },
      rulesExtend: {
        openStartTime: [{ validator: validateOpenTime, trigger: 'blur', priceIndex: 0 }]
      },
      activeName: 'first',
      dialogVisibleSelectTag: false,
      extendImageFileList: [],
      //选中的站点数据
      selectedStations: [],
      //选中的站点Id
      selectedStationIds: [],
      //地区列表数据
      areaLevel: ['province', 'city', 'area'],
      mapCenter: [121.59996, 31.197646],
      searchOption: {
        city: '全国', //范围
        citylimit: false //是否限制城市内搜索
      },
      amapPlugins: [],
      markers: [
        {
          position: [116.453905, 39.928821],
          visible: true,
          draggable: false,
          template: '<span>1</span>'
        }
      ],
      //停车减免类别
      freeTypeList: [
        {
          value: 0,
          label: '充电时长不小于'
        },
        {
          value: 1,
          label: '充电度数不小于'
        },
        {
          value: 2,
          label: '充电时长和充电度数都不小于'
        },
        {
          value: 3,
          label: '充电时长或充电度数不小于'
        }
      ]
    };
  },
  created() {
    this.fetchList();
    getDicts('station_status').then((response) => {
      this.stationStatusOptions = response.data;
    });
    getDicts('station_type').then((response) => {
      this.stationTypeOptions = response.data;
    });
    getDicts('station_construction').then((response) => {
      this.stationConstructionOptions = response.data;
    });
    getDicts('station_operation_status').then((response) => {
      this.stationOperationStatusOptions = response.data;
    });
    getDicts('station_service_tag').then((response) => {
      this.serviceTagOptions = response.data;
    });
  },
  methods: {
    /** 查询站点列表 */
    fetchList() {
      this.loading = true;
      listStation(this.queryParams).then((response) => {
        this.stationList = response.rows;
        this.total = Number(response.total);
        this.loading = false;
      });
    },
    /** 组装区域数据 */
    genarateOptions(data) {
      let options = {};
      for (const key in data) {
        if (key.endsWith('Id')) {
          options.value = data[key];
        } else if (key.endsWith('Name')) {
          options.label = data[key];
        } else if (key.endsWith('List')) {
          const childrenList = data[key];
          if (childrenList != null && childrenList.length > 0) {
            options.children = [];
            for (const child of childrenList) {
              let option = this.genarateOptions(child);
              options.children.push(option);
            }
          }
        }
      }
      return options;
    },
    // 站点状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.stationOperationStatusOptions, row.stationOpenState);
    },
    // 表单重置
    reset() {
      this.form = {
        stationId: undefined,
        parentId: 0,
        stationName: undefined,
        icon: undefined,
        stationType: 'M',
        orderNum: undefined,
        isFrame: '1',
        visible: '0',
        status: '0'
      };
      resetForm('form');
    },
    /** 搜索按钮操作 */
    doSearch() {
      this.queryParams.pageNum = 1;
      this.fetchList();
    },
    /** 重置按钮操作 */
    doReset() {
      resetForm('queryForm');
      this.doSearch();
    },
    doCancel: function () {
      this.reset();
      this.dialog.visible = false;
    },
    /** 修改按钮操作 */
    doEdit(row) {
      this.reset();
      getStation(row.stationId).then((response) => {
        this.form = response.data;
        this.dialog.visible = true;
        this.dialog.title = '修改站点';
        // 显示图片
        this.imageFileList = [];
        const picturesJson = JSON.parse(this.form.pictures) || [];
        picturesJson.forEach((item, index) => {
          this.imageFileList.push({ url: item, name: picturesJson[index] });
        });
        //地图点位
        const stationLng = this.form.stationLng;
        const stationLat = this.form.stationLat;
        if (stationLng > 0 && stationLat > 0) {
          //地图跳到该地点
          this.mapCenter = [stationLng, stationLat];
          // 图钉移到该地点
          this.markers[0].position = [stationLng, stationLat];
        }
      });
    },
    doSelectionChange(val) {
      this.selectedStations = val;
      this.selectedStationIds = this.selectedStations.map((station) => {
        return station.stationId;
      });
    },
    cascaderChange(value) {
      if (value && value.length > 0) {
        this.queryParams.areaCode = value[value.length - 1];
      } else {
        this.queryParams.areaCode = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.select-city {
  ::v-deep .el-form-item {
    display: inline-block;
    padding: 0 8px 0 0;
  }
}
.amap-page-container {
  position: relative;
  height: 330px;
  margin-top: 5px;
}
</style>
