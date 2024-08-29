<template>
  <div>
    <div class="mt10 mb10">
      <el-button type="primary" plain style="width: 120px" @click="doAdd()">添加运营商</el-button>
    </div>
    <el-table v-loading="loading" :data="stuffList" :height="'calc(100vh - 180px)'" border>
      <el-table-column prop="operatorId" label="编号" align="center" width="120"></el-table-column>
      <el-table-column prop="operatorInfo.operatorName" label="运营商名称" align="center"></el-table-column>
      <el-table-column prop="isEnable" label="启用" width="100" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.isEnable == 1" size="medium">启用</el-tag>
          <el-tag v-if="scope.row.isEnable == 0" size="medium" type="info">不启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120" class-name="small-padding">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="doEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="doDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="fetchList()" />

    <!-- 添加或修改站点对话框 -->
    <el-drawer v-model="dialog.visible" :title="title" size="500px" class="no-footer" :wrapper-closable="false" :append-to-body="true">
      <div class="el-drawer__content">
        <el-form ref="form" :model="form" label-width="100px" size="mini">
          <el-row>
            <el-col :span="24">
              <el-form-item label="客户运营商" prop="userId">
                <OperatorSelect
                  ref="operatorSelect"
                  v-model:visible="dialogVisibleSelectCustomer"
                  :selected="[operator]"
                  @success="submitSelectCustomer"
                  @input="getOperatorId"
                ></OperatorSelect>
                <el-tag v-if="operator.operatorId" size="medium" type="info"
                  >{{ operator.operatorInfo.operatorName }} （{{ operator.operatorInfo.operatorId }}）</el-tag
                >
                <el-button v-else type="primary" plain style="width: 120px" @click="onSelectUser">添加</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="启用" prop="isEnable">
                <el-radio-group v-model="form.isEnable">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
                <div class="form-tip">不启用时，站点不会与该运营商同步数据。</div>
              </el-form-item>
              <el-form-item label="上传订单" prop="isSyncTrade">
                <el-radio-group v-model="form.isSyncTrade">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
                <div class="form-tip">上报订单至政府平台，如联联平台。</div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" plain @click="doSave()">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { listStationOperator, addStationOperator, updateStationOperator, delStationOperator } from '@/api/basecharge/station';
import OperatorSelect from '@/components/SelectUserOperator';
import { resetForm } from '@/utils/common';

export default {
  name: 'StationOperatorTable',
  components: { OperatorSelect },
  props: {
    stationId: [Number, String]
  },
  data() {
    return {
      form: {},
      priceList: [],
      periodList: [],
      stuffList: [],
      loading: false,
      // 表单校验
      rules: {
        stationId: [{ required: true, message: '站点Id不能为空', trigger: 'blur' }],
        stationName: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }]
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        stationId: null,
        orgType: 3
      },
      total: 0,
      // 弹出层选项
      dialog: {
        visible: false,
        title: ''
      },
      currentDate: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        }
      },
      operator: {},
      dialogVisibleSelectCustomer: false
    };
  },
  watch: {
    stationId: {
      handler(val) {
        if (val) {
          this.queryParams.stationId = val;
          this.fetchList();
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    // 获取当前日期
    let myDate = new Date();
    this.currentDate = this.parseTime(myDate, '{y}{m}{d}');
  },
  methods: {
    getOperatorId(data) {
      if (data) {
        this.form.operatorId = data;
      }
    },
    // 选择客户群聊确认
    submitSelectCustomer(groups) {
      this.operator = groups;
      this.$set(this.operator, 'operatorInfo', { operatorId: groups.operatorId, operatorName: groups.operatorName });
    },
    compare(key) {
      return function (value1, value2) {
        var val1 = value1[key];
        var val2 = value2[key];
        return val1 - val2;
      };
    },
    /** 查询运营商列表 */
    fetchList() {
      this.loading = true;
      listStationOperator(this.queryParams.stationId).then((response) => {
        this.stuffList = response.data;
        // this.total = Number(response.total)
        this.loading = false;
      });
    },
    /** 新增按钮操作 */
    doAdd(row) {
      this.reset();
      this.dialog.visible = true;
      this.dialog.title = '添加运营商';
    },
    /** 修改按钮操作 */
    doEdit(row) {
      this.reset();
      this.form = row;
      resetForm(this.operator, 'operatorId', row.operatorInfo.operatorId);
      resetForm(this.operator, 'operatorInfo', { operatorId: row.operatorInfo.operatorId, operatorName: row.operatorInfo.operatorName });
      this.dialog.title = '修改';
      this.dialog.visible = true;
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        isEnable: 1,
        isSyncTrade: 0,
        stationId: this.stationId,
        operatorId: undefined
      };
      this.operator = {};
      resetForm('form');
    },

    /** 提交运营商 */
    /** 修改前doSave */
    // doSave: function () {
    //   debugger;
    //   this.$refs['form'].validate((valid) => {
    //     this.form.operatorId = this.operator.operatorId;
    //     if (valid && this.form.operatorId) {
    //       if (this.form.id != undefined) {
    //         updateStationOperator(this.form).then((response) => {
    //           if (response.code === 200) {
    //             this.$modal.msgSuccess('修改成功');
    //             this.dialog.visible = false;
    //             this.fetchList();
    //           }
    //         });
    //       } else {
    //         addStationOperator(this.form).then((response) => {
    //           if (response.code === 200) {
    //             this.$modal.msgSuccess('新增成功');
    //             this.dialog.visible = false;
    //             this.fetchList();
    //           }
    //         });
    //       }
    //     }
    //   });
    // },
    doSave: function () {
      // this.form.operatorId = this.operator.operatorId;
      if (this.form.operatorId) {
        if (this.form.id != undefined) {
          updateStationOperator(this.form).then((response) => {
            if (response.code === 200) {
              this.$modal.msgSuccess('修改成功');
              this.dialog.visible = false;
              this.fetchList();
            }
          });
        } else {
          addStationOperator(this.form).then((response) => {
            if (response.code === 200) {
              this.$modal.msgSuccess('新增成功');
              this.dialog.visible = false;
              this.fetchList();
            }
          });
        }
      }
    },
    /** 删除运营商操作 */
    doDelete(row) {
      this.$modal.confirm('确认删除吗?')
        .then(function () {
          return delStationOperator(row.id);
        })
        .then(() => {
          this.fetchList();
          _his.$modal.msgSuccess('删除成功');
        })
        .catch(function () {});
    },
    onSelectUser() {
      this.dialogVisibleSelectCustomer = true;
      resetForm().operatorSelect.reloadData();
    }
  }
};
</script>
