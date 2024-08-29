<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-row>
              <!-- <el-form-item label="审核状态" prop="checkState">
                <el-select v-model="queryParams.checkState" clearable size="small">
                  <el-option label="全部" value />
                  <el-option label="待审核" value="0" />
                  <el-option label="审核通过" value="1" />
                  <el-option label="审核不通过" value="2" />
                </el-select>
              </el-form-item> -->
              <el-form-item label="所属用户" prop="nickName">
                <el-input v-model="queryParams.nickName" placeholder clearable maxlength="50" />
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="queryParams.mobile" placeholder="填写完整手机号" clearable maxlength="11" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="车牌号" prop="plateNo">
                <el-input v-model="queryParams.plateNo" placeholder="车牌号" clearable />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="Search" @click="doSearch">搜索</el-button>
                <el-button icon="Refresh" @click="doReset">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>
      <el-table v-loading="loading" :data="orderList" @selection-change="doSelectionChange">
        <el-table-column type="index" width="55" align="center"></el-table-column>
        <el-table-column prop="plateNo" label="车辆号码" align="center"></el-table-column>
        <el-table-column prop="nickName" label="所属用户" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
        <!-- <el-table-column label="审核状态" align="center" prop="reviewStatus">
        <template slot-scope="scope" v-if="scope.row.licenseImgs!='[]' && scope.row.licenseImgs!=''">
          <el-tag type="info" v-if="scope.row.checkState == 0">待审核</el-tag>
          <el-tag type="success" v-if="scope.row.checkState == 1">审核通过</el-tag>
          <el-tag type="danger" v-if="scope.row.checkState == 2">审核不通过</el-tag>
        </template>
      </el-table-column> -->
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.licenseImgs != '[]' && scope.row.licenseImgs != ''" type="text" icon="View" @click="doEdit(scope.row)">{{
              scope.row.checkState == 0 ? '查看' : '查看'
            }}</el-button>
            <el-button v-else type="text" icon="View" @click="doEdit(scope.row)">查看</el-button>
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

    <!-- 审核对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" destroy-on-close append-to-body width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini">
        <!-- <div class="chunk-bg narrow-row" v-if="form.imgs && form.imgs.length > 0">
            <div class="title">
              审核状态
              <el-tag type="info" v-if="form.checkState == 0">待审核</el-tag>
              <el-tag type="success" v-if="form.checkState == 1">审核通过</el-tag>
              <el-tag type="danger" v-if="form.checkState == 2">审核不通过</el-tag>
            </div>
          </div> -->
        <div class="chunk-bg narrow-row" style="overflow: scroll">
          <div class="title">车辆信息</div>
          <el-form-item label="车辆号码" prop="plateNo">{{ form.plateNo }}</el-form-item>
          <el-form-item label="所属用户" prop="nickName">{{ form.nickName }}</el-form-item>
          <el-form-item label="手机号" prop="mobile">{{ form.mobile }}</el-form-item>
          <el-form-item v-if="form.imgs && form.imgs.length > 0" label="车辆行驶证" prop="imgs">
            <upload v-model:file-list="form.imgs" type="0" multiple disabled></upload>
          </el-form-item>
        </div>
        <!-- <div class="chunk-bg narrow-row" style="overflow: scroll;" v-if="form.checkState == 0 && form.imgs && form.imgs.length > 0">
            <div class="title">审核</div>
            <el-form-item>
              <el-button type="primary" @click="approve(1)">通过</el-button>
              <el-button type="danger" @click="approve(2)">不通过</el-button>
            </el-form-item>
          </div> -->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="doCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { listCar, getCar, approveCar, updateCar } from '@/api/customer/car';
import { resetForm } from '@/utils/common';

export default {
  name: 'Order',
  components: {},
  data() {
    let self = this;
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 选中Id数组
      ids: [],
      // 订单表格树数据
      orderList: [],
      // 总条数
      total: 0,
      // 订单树选项
      orderOptions: [],
      // 弹出层选项
      dialog: {
        visable: false,
        title: ''
      },
      priceOpen: false,
      // 订单状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        checkState: '',
        plateNo: '',
        nickName: '',
        mobile: ''
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
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
      ]
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    /** 查询车辆列表 */
    fetchList() {
      this.loading = true;
      let params = Object.assign({}, this.queryParams);
      listCar(params)
        .then((response) => {
          this.orderList = response.rows;
          this.total = Number(response.total);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // 表单重置
    reset() {
      this.form = {
        imgs: []
      };
      resetForm('form');
    },
    /** 搜索按钮操作 */
    doSearch() {
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          this.queryParams.pageNum = 1;
          this.fetchList();
        }
      });
    },
    /** 重置按钮操作 */
    doReset() {
      resetForm('queryForm');
      this.doSearch();
    },
    /** 修改按钮操作 */
    doEdit(row) {
      this.reset();
      getCar(row.id).then((response) => {
        this.form = response.data;
        this.form.imgs = [];
        try {
          this.form.licenseImgsShow.forEach((e) => {
            this.form.imgs.push({ url: e });
          });
        } catch {}
        this.dialog.visible = true;
        this.dialog.title = '车辆详情';
      });
    },
    doCancel: function () {
      this.reset();
      this.dialog.visible = false;
    },
    /** 提交按钮 */
    async approve(result) {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          // updateCar(this.form)
          let postData = {
            id: this.form.id,
            checkState: result
          };
          const response = await approveCar(postData);
          if (response.code === 200) {
            this.$modal.msgSuccess('审核成功');
            this.open = false;
            this.fetchList();
          }
        }
      });
    },
    // 多选框选中数据
    doSelectionChange(selection) {
      this.ids = selection.map((item) => item.refundId);
    }
  }
};
</script>

<style lang="scss" scoped>
.queryForm {
  padding-bottom: 8px;
}
.select-city {
  // display: flex !important;
  ::v-deep .el-form-item {
    display: inline-block;
    padding: 0 8px 0 0;
  }
}
</style>
