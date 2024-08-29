<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryForm" :model="queryParams" :inline="true">
            <el-form-item label="所属站点" prop="status">
              <SelectStation v-model="queryParams.stationId" :show-item-all="true" :clearable="true" @change="doSearch" />
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button v-hasPermim="['facility:baseStation:add']" type="primary" plain icon="Plus" @click="doAdd">新增 </el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="fetchList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="list">
        <el-table-column prop="equipmentId" label="编号" width="250" align="center"></el-table-column>
        <el-table-column prop="equipmentName" label="名称" :show-overflow-tooltip="true">
          <template #default="scope">
            <el-link @click="doEdit(scope.row)">
              <span>{{ scope.row.equipmentName }}</span>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="gunNum" label="充电枪头" width="80" align="center"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template #default="scope">
            <el-button type="text" icon="Edit" @click="doEdit(scope.row)">修改</el-button>
            <el-button type="text" icon="Delete" @click="doDelete(scope.row)">删除</el-button>
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

    <!-- 添加或修改充电桩对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" destroy-on-close append-to-body width="600px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane name="first" label="基础信息">
          <el-form ref="postForm" :model="form" :rules="rules" label-width="120px" size="mini">
            <el-row>
              <el-col :span="12">
                <el-form-item label="充电桩唯一编码" prop="equipmentId">
                  <el-input v-model="form.equipmentId" placeholder :disabled="form.id != null" max-length="14" />
                  <div class="form-tip">设备唯一编码，14位编号</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="充电桩编号" prop="pileNo">
                  <el-input v-model="form.pileNo" placeholder max-length="14" />
                  <div class="form-tip">桩设备硬件本身的编号。正常情况下，与充电桩唯一编码一致。</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属站点" prop="stationId">
                  <SelectStation v-model="form.stationId" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="充电桩名称" prop="equipmentName">
                  <el-input v-model="form.equipmentName" placeholder max-length="30" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="充电桩类型" prop="equipmentType">
                  <el-select v-model="form.equipmentType" :popper-append-to-body="false">
                    <el-option
                      v-for="dict in equipmentTypeOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="Number(dict.dictValue)"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产商名称" prop="manufacturerName">
                  <el-input v-model="form.manufacturerName" placeholder max-length="30" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="生产商组织机构代码" prop="manufacturerId" label-width="150px" max-length="9">
                  <el-input v-model="form.manufacturerId" maxlength="9" placeholder />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经纬度">
                  <el-input-number
                    v-model="form.equipmentLng"
                    :controls="false"
                    :precision="6"
                    :max="999"
                    placeholder="经度"
                    style="width: 85px"
                  />&nbsp;&nbsp;,&nbsp;&nbsp;
                  <el-input-number v-model="form.equipmentLat" :controls="false" :precision="6" :max="999" placeholder="纬度" style="width: 85px" />
                  <div class="form-tip">请输入GCJ-02坐标系，最多保留小数点后6位</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="设备型号" prop="equipmentModel">
                  <el-input v-model="form.equipmentModel" placeholder max-length="20" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总功率" prop="power">
                  <el-input-number
                    v-model="form.power"
                    style="width: 120px"
                    :controls="false"
                    :precision="1"
                    :min="0"
                    :max="999999999"
                    class="append_unit"
                    data-unit="kW"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="生产日期" prop="productionDate">
                  <el-date-picker v-model="form.productionDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大允许输出功率" label-width="150px" prop="maxPower">
                  <el-input-number
                    v-model="form.maxPower"
                    :controls="false"
                    :min="1"
                    :max="100"
                    max-length="3"
                    class="append_unit"
                    data-unit="%"
                    :precision="0"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label prop="remark">
                  <el-button type="primary" native-type="submit" style="width: 120px" @click="doSave"> 保 存</el-button>
                  <el-button @click="doCancel">取 消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane v-if="form.id != null" name="second" label="充电接口">
          <div v-for="(connector, connectorIndex) in connectorList" :key="connectorIndex" class="chunk-bg">
            <el-form ref="connector" :model="connector" :rules="connectorRules" label-width="120px" size="mini">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="接口ID" prop="gunNo">
                    <div style="display: inline">{{ connector.equipmentId }}</div>
                    <el-input
                      v-model="connector.gunNo"
                      style="width: 80px"
                      :disabled="connector.id != null"
                      max-length="3"
                      :controls="false"
                      @input="gunNoChange(connector)"
                    ></el-input>
                    <div class="form-tip">接口ID为所属桩号+枪号，枪号应为1-255的整数</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="额定电压" prop="voltageLowerLimits">
                    <el-input-number
                      v-model="connector.voltageLowerLimits"
                      placeholder
                      style="width: 110px"
                      :min="0"
                      :precision="0"
                      :max="999999999"
                      :controls="false"
                      class="append_unit"
                      data-unit="V"
                    />
                    -
                    <el-input-number
                      v-model="connector.voltageUpperLimits"
                      placeholder
                      style="width: 110px"
                      :min="0"
                      :precision="0"
                      :max="999999999"
                      :controls="false"
                      class="append_unit"
                      data-unit="V"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="接口名称" prop="connectorName">
                    <el-input v-model="connector.connectorName" placeholder max-length="30" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="额定电流" prop="currentValue">
                    <el-input-number
                      v-model="connector.currentValue"
                      placeholder
                      style="width: 110px"
                      :min="0"
                      :precision="0"
                      :max="999999999"
                      :controls="false"
                      class="append_unit"
                      data-unit="A"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="接口类型" prop="connectorType">
                    <el-select v-model="connector.connectorType" :popper-append-to-body="false">
                      <el-option
                        v-for="dict in connectorTypeOptions"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="Number(dict.dictValue)"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="额定功率" prop="power">
                    <el-input-number
                      v-model="connector.power"
                      placeholder
                      style="width: 110px"
                      :min="0"
                      :precision="1"
                      :max="999999999"
                      :controls="false"
                      class="append_unit"
                      data-unit="KW"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="车位号" prop="parkNo">
                    <el-input v-model="connector.parkNo" placeholder max-length="10" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="国家标准" prop="nationalStandard">
                    <el-select v-model="connector.nationalStandard" size="small">
                      <el-option label="2011" value="1" />
                      <el-option label="2015" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label prop="remark">
                    <el-button type="primary" style="width: 120px" @click="submitConnector(connectorIndex)"> 保 存 </el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDeleteConnector(connectorIndex)">删除 </el-button>
                    <el-button v-if="connector.id != null" type="" style="width: 100px" @click="doStartConnector(connectorIndex)"
                      >启动模拟枪
                    </el-button>
                    <el-button v-if="connector.id != null" type="" style="width: 100px" @click="doStopConnector(connectorIndex)"
                      >停止模拟枪
                    </el-button>
                    <el-button v-if="connector.id != null" type="" style="width: 100px" @click="doLinkConnector(connectorIndex)">插枪 </el-button>
                    <el-button v-if="connector.id != null" type="" style="width: 100px" @click="doUlinkConnector(connectorIndex)">拔枪 </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-button style="width: 120px" @click="addConnectorRow()">添加充电接口</el-button>
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
import { listEquipment, getEquipment, delEquipment, addEquipment, updateEquipment } from '@/api/basecharge/equipment';
import { listConnector, getConnector, delConnector, addConnector, updateConnector } from '@/api/basecharge/connector';
import { startConnector, stopConnector, unlinkConnector, linkConnector } from '@/api/basecharge/connector';
import { getDicts } from '@/api/system/dict/data';
import { resetForm } from '@/utils/common';
import TreeSelect from '@/components/TreeSelect';
import IconSelect from '@/components/IconSelect';
import SelectStation from '@/components/SelectStation/BaseFacilityStation';

export default {
  name: 'Equipment',
  components: { TreeSelect, IconSelect, SelectStation },
  data() {
    let self = this;
    var validateConnectorId = (rule, value, callback) => {
      //接口ID判重
      if (self.curConnectorIndex == null) {
        callback();
        return;
      }
      let curConnector = self.connectorList[self.curConnectorIndex];
      if (curConnector.id != null) {
        callback();
        return;
      }
      const curGunNo = value;
      const curGunNoNum = parseInt(curGunNo);
      if (isNaN(curGunNoNum) || curGunNoNum < 1 || curGunNoNum > 255) {
        callback(new Error('枪号应为1-255的整数'));
        return;
      }
      for (let index = 0; index < self.connectorList.length; index++) {
        if (self.connectorList[index].id != null && curGunNo == self.connectorList[index].gunNo) {
          callback(new Error('充电接口已经存在'));
          return;
        }
      }
      callback();
    };
    var validateManufacturerId = (rule, value, callback) => {
      if (value != null && value != '' && !isOrganizationNo(value)) {
        callback(new Error('生产商组织机构代码为9位'));
      } else {
        callback();
      }
    };
    var validateValidateLimits = (rule, value, callback) => {
      if (self.curConnectorIndex == null) {
        callback();
        return;
      }
      let curConnector = self.connectorList[self.curConnectorIndex];
      if (curConnector.voltageLowerLimits == undefined || curConnector.voltageUpperLimits == undefined) {
        callback(new Error('请填写额定电压'));
      } else if (curConnector.voltageLowerLimits > curConnector.voltageUpperLimits) {
        callback(new Error('额定电压上限不能小于额定电压下限'));
      } else {
        callback();
      }
    };
    var validateNationalStandard = (rule, value, callback) => {
      if (value == null || value == 0) {
        callback(new Error('请选择国家标准'));
      } else {
        callback();
      }
    };
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 充电桩表格树数据
      list: [],
      total: 0,
      connectorList: [],
      // 充电桩树选项
      menuOptions: [],
      equipmentTypeOptions: [], //站点类型
      connectorTypeOptions: [], //充电接口类型
      // 弹出层选项
      dialog: {
        visible: false,
        title: ''
      },
      // 充电桩状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        stationId: '',
        pageNum: 1,
        pageSize: 20
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        equipmentId: [{ required: true, message: '充电桩唯一编码不能为空', trigger: 'blur' }],
        stationId: [{ required: true, message: '所属站点不能为空', trigger: 'blur' }],
        equipmentName: [{ required: true, message: '充电桩名称不能为空', trigger: 'blur' }],
        equipmentType: [{ required: true, message: '充电桩类型不能为空', trigger: 'blur' }],
        manufacturerId: [{ required: true, message: '生产商组织机构代码不能为空', trigger: 'blur' }],
        power: [{ required: true, message: '总功率不能为空', trigger: 'blur' }]
      },
      // 表单校验
      connectorRules: {
        gunNo: [{ required: true, message: '充电接口Id不能为空', trigger: 'blur' }],
        connectorName: [{ required: true, message: '充电桩接口不能为空', trigger: 'blur' }],
        connectorType: [{ required: true, message: '接口类型不能为空', trigger: 'blur' }],
        voltageLowerLimits: [{ required: true, message: '请填写额定电压', trigger: 'blur' }],
        currentValue: [{ required: true, message: '额定电流不能为空', trigger: 'blur' }],
        power: [{ required: true, message: '额定功率不能为空', trigger: 'blur' }],
        nationalStandard: [{ required: true, message: '请选择国家标准', trigger: 'blur' }]
      },
      activeName: 'first',
      customPrice: false,
      curConnectorIndex: null
    };
  },
  created() {
    this.queryParams.stationId = this.$route.query && this.$route.query.sId;
    this.fetchList();
    getDicts('equipment_type').then((response) => {
      this.equipmentTypeOptions = response.data;
    });
    getDicts('connector_type').then((response) => {
      this.connectorTypeOptions = response.data;
    });
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询充电桩列表 */
    fetchList() {
      this.loading = true;
      listEquipment(this.queryParams).then((response) => {
        this.list = response.rows;
        this.total = Number(response.total);
        this.loading = false;
      });
    },
    /** 查询充电枪列表 */
    getConnectorList() {
      this.loading = true;
      listConnector({ equipmentId: this.form.equipmentId }).then((response) => {
        this.connectorList = response.rows;
        this.connectorList.forEach((g) => {
          g.gunNo = g.connectorId.slice(g.equipmentId.length);
          g.nationalStandard = String(g.nationalStandard);
        });
        this.loading = false;
      });
    },
    // 取消按钮
    doCancel() {
      this.dialog.visible = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        equipmentId: undefined,
        equipmentName: undefined,
        stationId: ''
      };
      resetForm('postForm');
    },
    /** 搜索按钮操作 */
    doSearch() {
      this.queryParams.pageNum = 1;
      this.fetchList();
    },
    /** 新增按钮操作 */
    doAdd(row) {
      this.reset();
      this.form.stationId = this.queryParams.stationId;
      this.dialog.visible = true;
      this.dialog.title = '添加充电桩';
    },
    /** 修改按钮操作 */
    doEdit(row) {
      // this.reset();
      getEquipment(row.equipmentId).then((response) => {
        this.form = response.data;
        this.form.maxPower = this.form.maxPower * 100;
        this.dialog.visible = true;
        this.dialog.title = '修改充电桩';
        // 获取其下的充电接口
        this.getConnectorList();
      });
    },
    /** 提交按钮 */
    doSave: function () {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.form);
          params.maxPower = params.maxPower / 100;
          if (this.form.id != undefined) {
            updateEquipment(params).then((response) => {
              if (response.code === 200) {
                this.$modal.msgSuccess('修改成功');
                this.dialog.visible = false;
                this.fetchList();
              }
            });
          } else {
            addEquipment(params).then((response) => {
              if (response.code === 200) {
                this.$modal.msgSuccess('新增成功');
                this.dialog.visible = false;
                this.fetchList();
              }
            });
          }
        }
      });
    },
    /** 提交充电枪按钮 */
    submitConnector: function (index) {
      this.curConnectorIndex = index;
      this.$refs.connector[index].validate((valid) => {
        let connectorForm = this.connectorList[index];
        if (valid) {
          if (connectorForm.id != undefined) {
            updateConnector(connectorForm).then((response) => {
              if (response.code === 200) {
                this.$modal.msgSuccess('修改成功');
              }
            });
          } else {
            addConnector(connectorForm).then((response) => {
              if (response.code === 200) {
                this.$modal.msgSuccess('新增成功');
                this.connectorList[index] = response.data;
              }
            });
          }
        }
        this.curConnectorIndex = null;
      });
    },
    /** 删除按钮操作 */
    doDelete(row) {
      this.$modal
        .confirm('确认删除吗?')
        .then(function () {
          return delEquipment(row.equipmentId);
        })
        .then(() => {
          this.fetchList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(function () {});
    },
    /** 删除充电枪操作 */
    handleDeleteConnector(index) {
      let _this = this;
      this.$modal
        .confirm('确认删除吗?')
        .then(function () {
          if (_this.connectorList[index].id != null) {
            return delConnector(_this.connectorList[index].connectorId);
          } else {
            return;
          }
        })
        .then(() => {
          this.connectorList.splice(index, 1);
          this.$modal.msgSuccess('删除成功');
        })
        .catch(function () {});
    },
    addConnectorRow() {
      this.connectorList.push({
        equipmentId: this.form.equipmentId,
        connectorId: undefined,
        gunNo: undefined,
        connectorName: undefined,
        nationalStandard: '2'
      });
    },
    doStartConnector(connectorIndex) {
      let connector = this.connectorList[connectorIndex];
      const connectorId = connector.connectorId;
      startConnector({
        connectorId
      })
        .then((res) => {
          this.$modal.msgSuccess('启动成功');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doStopConnector(connectorIndex) {
      let connector = this.connectorList[connectorIndex];
      const connectorId = connector.connectorId;
      stopConnector({
        connectorId
      })
        .then((res) => {
          this.$modal.msgSuccess('停止成功');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doLinkConnector(connectorIndex) {
      let connector = this.connectorList[connectorIndex];
      const connectorId = connector.connectorId;
      linkConnector({
        connectorId
      })
        .then((res) => {
          this.$modal.msgSuccess('插枪成功');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doUlinkConnector(connectorIndex) {
      let connector = this.connectorList[connectorIndex];
      const connectorId = connector.connectorId;
      ulinkConnector({
        connectorId
      })
        .then((res) => {
          this.$modal.msgSuccess('拔枪成功');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gunNoChange(connector) {
      // connector.connectorId = connector.equipmentId + connector.gunNo.toString().padStart(3, '0')
      connector.connectorId = connector.equipmentId + connector.gunNo;
    },
    handleClose(done) {
      this.fetchList();
      done();
    }
  }
};
</script>
