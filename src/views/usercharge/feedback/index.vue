<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="用户名" prop="nickName">
              <el-input v-model="queryParams.nickName" placeholder clearable max-length="30" />
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="queryParams.mobile" placeholder="填写完整手机号..." clearable max-length="11" />
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
          <right-toolbar v-model:showSearch="showSearch" @query-table="fetchList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="feedbackList">
        <el-table-column type="index" width="55" align="center"></el-table-column>
        <el-table-column label="头像" align="center" width="75">
          <template #default="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="150" align="center"></el-table-column>
        <el-table-column prop="feedbackType" label="问题类型" :formatter="feedbackTypeFormat" width="150" align="center"></el-table-column>
        <el-table-column prop="feedbackContent" label="反馈内容" align="center"></el-table-column>
        <el-table-column label="反馈时间" align="center" width="150" prop="createTime">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template #default="scope">
            <el-button v-hasPermi="['customer:feedback:edit']" link type="primary" icon="View" @click="doEdit(scope.row)">详情</el-button>
            <el-button v-hasPermi="['customer:feedback:remove']" link type="primary" icon="Delete" @click="doRemove(scope.row)">删除</el-button>
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

    <!-- 意见反馈对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" destroy-on-close append-to-body width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="chunk-bg narrow-row">
          <div class="title">意见内容</div>
          <el-form-item label="反馈人">{{ form.userName }} {{ form.mobile }}</el-form-item>
          <el-form-item label="问题类型" prop="feedbackName">
            {{ feedbackTypeFormat({ feedbackType: form.feedbackType }) }}
          </el-form-item>
          <el-form-item v-if="form.connectorId" label="充电枪编号" prop="connectorId">{{ form.connectorId }}</el-form-item>
          <el-form-item label="问题描述" prop="feedbackContent">{{ form.feedbackContent }}</el-form-item>
          <el-form-item v-if="form.imgs && form.imgs.length > 0" label="图片" prop="imgs">
            <upload v-model:file-list="form.imgs" type="0" multiple disabled></upload>
          </el-form-item>
        </div>
        <div class="chunk-bg">
          <div class="title">回复</div>
          <el-row v-if="!form.replyFlag">
            <el-col :span="24">
              <el-form-item label="回复内容" prop="replyContent">
                <el-input v-model="form.replyContent" type="textarea" maxlength="256" placeholder="请输入回复内容" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.replyFlag">
            <el-col :span="24">
              <el-form-item label="回复内容" prop="replyContent">{{ form.replyContent }}</el-form-item>
            </el-col>
          </el-row>
        </div>
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
import { listFeedback, getFeedback, delFeedback, addFeedback, updateFeedback } from '@/api/customer/feedback';
import { getDicts } from '@/api/system/dict/data';
import { resetForm } from '@/utils/common';

export default {
  name: 'Feedback',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 企业表格树数据
      feedbackList: [],
      // 总条数
      total: 0,
      feedbackTypeOptions: [],
      priceOpen: false,
      // 企业状态数据字典
      statusOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        replyContent: [{ required: true, message: '回复内容不能为空', trigger: 'blur' }]
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
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        nickName: '',
        mobile: ''
      },
      // 弹出层选项
      dialog: {
        visable: false,
        title: ''
      }
    };
  },
  created() {
    this.fetchList();
    getDicts('feedback_type').then((response) => {
      this.feedbackTypeOptions = response.data;
    });
  },
  methods: {
    // 站点状态字典翻译
    feedbackTypeFormat(row, column) {
      return this.selectDictLabel(this.feedbackTypeOptions, row.feedbackType);
    },
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询企业列表 */
    fetchList() {
      this.loading = true;
      listFeedback(this.queryParams).then((response) => {
        this.feedbackList = response.rows;
        this.total = Number(response.total);
        this.loading = false;
      });
    },
    /** 转换企业数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.feedbackName,
        children: node.children
      };
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        feedbackName: undefined,
        imgs: []
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
    /** 修改按钮操作 */
    doRemove(row) {
      this.$modal
        .confirm('是否确认删除名称为"' + row.feedbackContent + '"的数据项?')
        .then(function () {
          return delFeedback(row.Id);
        })
        .then(() => {
          this.feedbackList.splice(index, 1);
          this.$modal.msgSuccess('删除成功');
        })
        .catch(function () {});
    },
    /** 修改按钮操作 */
    doEdit(row) {
      this.reset();
      getFeedback(row.id).then((response) => {
        this.form = response.data;
        this.form.imgs = [];
        try {
          this.form.imgUrls.forEach((e) => {
            this.form.imgs.push({ url: e });
          });
        } catch {}
        this.dialog.visible = true;
        this.dialog.title = '意见反馈';
      });
    },
    doCancel: function () {
      this.reset();
      this.dialog.visible = false;
    },
    /** 提交按钮 */
    doSave: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let postData = Object.assign({}, this.form);
          delete postData.imgs;
          delete postData.imgUrls;
          if (postData.id != undefined) {
            postData.replyFlag = 1;
            updateFeedback(postData).then((response) => {
              if (response.code === 200) {
                this.$modal.msgSuccess('修改成功');
                this.dialog.visible = false;
                this.fetchList();
              }
            });
          } else {
            addFeedback(postData).then((response) => {
              if (response.code === 200) {
                this.$modal.msgSuccess('新增成功');
                this.dialog.visible = false;
                this.fetchList();
              }
            });
          }
        }
      });
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
</style>
