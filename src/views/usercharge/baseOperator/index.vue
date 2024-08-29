<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryForm" :model="queryParams" :inline="true">
            <el-form-item label prop="operatorName">
              <el-input
                v-model="queryParams.operatorName"
                placeholder="搜索基础运营商名称"
                clearable
                style="width: 250px"
                @keyup.enter.native="doSearch"
              />
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
          <el-col :span="1.5">
            <el-button v-hasPermi="['customer:baseOperator:add']" type="primary" plain icon="Plus" @click="doAdd">新增 </el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="fetchList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="OperatorList">
        <el-table-column type="index" width="55" align="center"></el-table-column>
        <el-table-column prop="operatorId" label="基础运营商ID" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="operatorName" label="基础运营商名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="operatorTel1" label="联系电话" width="180" align="center"></el-table-column>
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

    <!-- 添加或修改运营商对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" destroy-on-close append-to-body width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row class="chunk-bg">
          <div class="title">基本信息</div>
          <el-col :span="24">
            <el-form-item label="运营商名称" prop="operatorName">
              <el-input v-model="form.operatorName" placeholder max-length="64" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="运营商ID" prop="operatorId">
              <el-input v-model="form.operatorId" placeholder max-length="10" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="运营商电话1" prop="operatorTel1">
              <el-input v-model="form.operatorTel1" style="width: 120px" placeholder />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="运营商电话2" prop="operatorTel2">
              <el-input v-model="form.operatorTel2" style="width: 120px" placeholder />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="注册地址" prop="operatorRegAddress">
              <el-input v-model="form.operatorRegAddress" placeholder max-length="64" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="chunk-bg">
          <div class="title">调用该运营商所需密钥</div>
          <el-col :span="24">
            <el-form-item label="消息密钥" prop="baseDataSecret">
              <el-input v-model="form.baseDataSecret" placeholder max-length="64" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="消息密钥初始化向量" prop="baseDataSecretIv">
              <el-input v-model="form.baseDataSecretIv" placeholder max-length="16" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="运营商密钥" prop="baseOperatorSecret">
              <el-input v-model="form.baseOperatorSecret" placeholder max-length="64" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="签名密钥" prop="baseSigSecret">
              <el-input v-model="form.baseSigSecret" placeholder max-length="64" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="接口地址" prop="apiUrl">
              <el-input v-model="form.apiUrl" placeholder max-length="128" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="运营商平台类型" prop="platType">
              <el-select v-model="form.platType" :popper-append-to-body="false">
                <el-option
                  v-for="dict in stationTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="Number(dict.dictValue)"
                ></el-option>
              </el-select>
              <div class="form-tip">基础设施运营商的平台类型，用于接口对接区分用</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="chunk-bg">
          <div class="title">我方（客户归属云平台）供该运营商调用的密钥</div>
          <div v-if="!form.id" class="f-des">创建完成后，自动生成</div>
          <div v-if="form.id">
            <el-col :span="24">
              <el-form-item label="客户归属运营商平台（我方）标识" prop="userOperatorId" label-width="250px">
                <el-input v-model="form.userOperatorId" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="消息密钥" prop="dataSecret">
                <el-input v-model="form.dataSecret" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="消息密钥初始化向量" prop="dataSecretIv">
                <el-input v-model="form.dataSecretIv" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="平台密钥" prop="operatorSecret">
                <el-input v-model="form.operatorSecret" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="签名密钥" prop="sigSecret">
                <el-input v-model="form.sigSecret" disabled />
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="doSave">确 定</el-button>
          <el-button @click="doCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { listOperator, getOperator, delOperator, addOperator, updateOperator } from '@/api/facility/operator';
import { getDicts } from '@/api/system/dict/data';
import { resetForm } from '@/utils/common';
import { transPhoneNumber } from '@/utils/filters';
export default {
  name: 'Operator',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 运营商表格树数据
      OperatorList: [],
      // 总条数
      total: 0,
      stationTypeOptions: [], //平台类型
      // 弹出层选项
      dialog: {
        visable: false,
        title: ''
      },
      priceOpen: false,
      // 运营商状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        operatorName: undefined,
        visible: undefined,
        pageNum: 1,
        pageSize: 20
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        operatorId: [{ required: true, message: '运营商Id不能为空', trigger: 'blur' }],
        operatorName: [{ required: true, message: '运营商名称不能为空', trigger: 'blur' }],
        baseDataSecret: [{ required: true, message: '消息密钥不能为空', trigger: 'blur' }],
        baseDataSecretIv: [{ required: true, message: '消息密钥初始化向量不能为空', trigger: 'blur' }],
        baseOperatorSecret: [{ required: true, message: '运营商密钥不能为空', trigger: 'blur' }],
        baseSigSecret: [{ required: true, message: '签名密钥不能为空', trigger: 'blur' }],
        apiUrl: [{ required: true, message: '接口地址不能为空', trigger: 'blur' }],
        platType: [{ required: true, message: '请选择运营商平台类型', trigger: 'blur' }]
      },
      activeName: 'first',
      serviceTagOptions: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      query: {
        pageNum: 1,
        pageSize: 20,
        groupTagType: this.type
      }
    };
  },
  created() {
    this.fetchList();
    getDicts('base_station_plat_type').then((response) => {
      this.stationTypeOptions = response.data;
    });
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询运营商列表 */
    fetchList() {
      this.loading = true;
      listOperator(this.queryParams).then((response) => {
        this.OperatorList = response.rows;
        this.total = Number(response.total);
        this.loading = false;
      });
    },
    // 表单重置
    reset() {
      this.form = {
        operatorId: undefined,
        operatorName: undefined
      };
      resetForm('form');
    },
    /** 搜索按钮操作 */
    doSearch() {
      this.queryParams.pageNum = 1;
      this.fetchList();
    },
    /** 新增按钮操作 */
    doAdd(row) {
      this.reset();
      this.dialog.visible = true;
      this.dialog.title = '添加基础设施运营商';
    },
    /** 修改按钮操作 */
    doEdit(row) {
      this.reset();
      getOperator(row.operatorId).then((response) => {
        this.form = response.data;
        this.form.operatorTel1 = transPhoneNumber(this.form.operatorTel1);
        this.form.operatorTel2 = transPhoneNumber(this.form.operatorTel2);
        this.dialog.visible = true;
        this.dialog.title = '修改基础设施运营商';
      });
    },
    doCancel: function () {
      this.dialog.visible = false;
      this.reset();
    },
    /** 提交按钮 */
    doSave: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateOperator(this.form).then((response) => {
              if (response.code === 200) {
                this.$modal.msgSuccess('修改成功');
                this.dialog.visible = false;
                this.fetchList();
              }
            });
          } else {
            addOperator(this.form).then((response) => {
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
    /** 删除按钮操作 */
    doDelete(row) {
      this.$modal.confirm('是否确认删除名称为"' + row.operatorName + '"的数据项?')
        .then(function () {
          return delOperator(row.operatorId);
        })
        .then(() => {
          this.fetchList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(function () {});
    }
  }
};
</script>

<style lang="scss" scoped>
.select-city {
  // display: flex !important;
  ::v-deep .el-form-item {
    display: inline-block;
    padding: 0 8px 0 0;
  }
}

.chunk-bg {
  background-color: #fff;
}
</style>
