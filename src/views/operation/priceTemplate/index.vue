<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryForm" :model="queryParams" :inline="true">
            <el-form-item label prop="remark">
              <el-input
                v-model="queryParams.keyword"
                placeholder="搜索名称"
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
            <el-button v-hasPermi="['baseFacility:basePriceTemplate:add']" type="primary" plain icon="Plus" @click="doAdd">新增 </el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="fetchList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="templateList">
        <el-table-column type="index" width="55" align="center"></el-table-column>
        <el-table-column prop="remark" label="模板名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="创建时间" align="center" prop="time">
          <template #default="scope">
            <span>{{ parseTime(scope.row.time) }}</span>
          </template>
        </el-table-column>
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

    <!-- 添加编辑对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" destroy-on-close append-to-body width="800px">
      <PriceInfoForm ref="priceInfoForm" :price-code="priceCode" @success="onEditTemplateSuccess" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="doCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { listPriceTemplate, deletePriceTemplate } from '@/api/basecharge/priceTemplate';
import PriceInfoForm from './components/-price-info';
import { resetForm } from '@/utils/common';

export default {
  name: 'PriceTemplate',
  components: { PriceInfoForm },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 运营商表格树数据
      templateList: [],
      // 总条数
      total: 0,
      // 运营商树选项
      OperatorOptions: [],
      // 弹出层选项
      dialog: {
        visable: false,
        title: ''
      },
      priceOpen: false,
      // 查询参数
      queryParams: {
        keyword: undefined,
        pageNum: 1,
        pageSize: 20
      },
      // 表单参数
      form: {},
      priceCode: undefined
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    /** 查询运营商列表 */
    fetchList() {
      this.loading = true;
      listPriceTemplate(this.queryParams).then((response) => {
        this.templateList = response.data.rows;
        this.total = Number(response.data.total);
        this.loading = false;
      });
    },
    // 表单重置
    reset() {
      this.$nextTick(() => {
        this.$refs.priceInfoForm?.reset();
      });
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
      this.dialog.title = '添加价格模板';
    },
    /** 修改按钮操作 */
    doEdit(row) {
      this.reset();
      this.priceCode = row.priceCode;
      this.dialog.title = '修改价格模板';
      this.dialog.visible = true;
      this.$nextTick(() => {
        //priceInfoForm.reloadData();
        ref.priceInfoForm.reloadData();
        //this.$refs.priceInfoForm.reloadData();
      });
    },
    doCancel: function () {
      this.reset();
      this.dialog.visible = false;
    },
    /** 删除按钮操作 */
    doDelete(row) {
      this.$modal.confirm('是否确认删除名称为"' + row.remark + '"的数据项?')
        .then(function () {
          return deletePriceTemplate(row.priceCode);
        })
        .then(() => {
          this.fetchList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(function () {});
    },
    onEditTemplateSuccess() {
      this.open = false;
      this.fetchList();
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
