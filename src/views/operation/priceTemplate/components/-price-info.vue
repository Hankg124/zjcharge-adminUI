<template>
  <div>
    <el-row class="chunk-bg">
      <div class="title">
        模板信息
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
          <el-row>
            <el-col :span="24">
              <el-form-item label="模板名称" prop="remark">
                <el-input style="width: 300px" v-model="form.remark" placeholder maxlength="128" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="margin-bottom: 5px"></div>
    </el-row>
    <el-row class="chunk-bg">
      <div class="title">充电价格档</div>
      <el-alert class="form-alert" :title="alertTitle" :type="alertType" center :closable="false" />
      <div v-for="(price, priceIndex) in form.priceList" :key="priceIndex">
        <el-form
          ref="price"
          :model="price"
          label-width="120px"
          label-position="top"
          size="mini"
          :rules="priceRules"
          :disabled="form.priceCode != null"
        >
          <el-row>
            <el-col :span="4" class="time-str">
              <el-form-item prop="startTimeStr">
                <el-time-select
                  v-model="price.startTimeStr"
                  :picker-options="{ start: '00:00', end: '23:00', step: '01:00' }"
                  placeholder="开始时间"
                  style="width: 210px"
                  @change="checkPrice"
                ></el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="priceType">
                <el-radio-group v-model="price.priceType">
                  <el-radio-button v-for="dict in chargingPriceTypeOptions" :key="dict.dictValue" :label="Number(dict.dictValue)">
                    {{ dict.dictLabel }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="elecPrice">
                <el-input-number
                  v-model="price.elecPrice"
                  placeholder="电费"
                  :controls="false"
                  :precision="2"
                  :min="0"
                  :max="9999"
                  style="width: 100px"
                  class="append_unit"
                  data-unit="元"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="servicePrice">
                <el-input-number
                  v-model="price.servicePrice"
                  placeholder="服务费"
                  :controls="false"
                  :precision="2"
                  :min="0"
                  :max="9999"
                  style="width: 100px"
                  class="append_unit"
                  data-unit="元"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>共 {{ calc('accAdd', price.elecPrice, price.servicePrice) | unitPrice }}元</el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button plain icon="el-icon-delete" @click="handleDeletePrice(priceIndex)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="padding: 8px 10px 10px" v-if="form.priceCode == null">
        <el-button type="primary" plain @click="addPriceRow()" style="width: 120px">添加价格档</el-button>
      </div>
    </el-row>
    <el-button type="primary" @click="doSave()" style="width: 120px">保存</el-button>
  </div>
</template>

<script>
import { getPriceTemplate, addPriceTemplate, updatePriceTemplate } from '@/api/basecharge/priceTemplate';
import calculation from '@/utils/calculation';
import { getDicts } from '@/api/system/dict/data';

export default {
  name: 'StationPriceForm',
  props: {
    priceCode: [Number, String]
  },
  data() {
    var self = this;
    var validatePriceId = (rule, value, callback) => {
      if (value == null) {
        callback(new Error('请选择价格档'));
      } else {
        let selectIndex = this.form.priceList.findIndex((item) => {
          return value == item.priceId;
        });
        if (selectIndex == -1) {
          callback(new Error('请选择价格档'));
          return;
        }
        callback();
      }
    };
    return {
      form: {
        priceCode: undefined,
        remark: undefined,
        priceList: []
      },
      loading: false,
      // 表单校验
      rules: {
        remark: [{ required: true, message: '模板名称', trigger: 'blur' }]
      },
      priceRules: {
        startTime: [{ required: true, message: '请选择价开始时间', trigger: 'blur' }],
        priceType: [{ required: true, message: '请选择价格档', trigger: 'blur' }],
        elecPrice: [{ required: true, message: '请输入电费', trigger: 'blur' }],
        servicePrice: [{ required: true, message: '请输入服务费', trigger: 'blur' }]
      },
      chargingPriceTypeOptions: [], //价格档
      equipmentDataExt: {},
      resultArr: [], //接受验证返回结果数组
      alertTitle: '未覆盖所有计费时段',
      alertType: 'warning',
      checkResult: 'RepeatError'
    };
  },
  watch: {
    priceCode: {
      handler(val) {
        this.form.priceCode = val;
      },
      immediate: true
    }
  },
  created() {
    getDicts('charging_price_type').then((response) => {
      this.chargingPriceTypeOptions = response.data;
    });
  },
  mounted: function () {},
  methods: {
    reloadData() {
      this.getPrice();
    },
    reset() {
      this.form = {
        priceCode: undefined,
        remark: undefined,
        priceList: []
      };
    },
    calc(type, num1, num2) {
      return calculation[type](num1, num2);
    },
    compare(key) {
      return function (value1, value2) {
        var val1 = value1[key];
        var val2 = value2[key];
        return val1 - val2;
      };
    },
    /** 查询价格档列表 */
    getPrice() {
      this.loading = true;
      // this.priceCode = "1"
      if (this.priceCode == null) return;
      getPriceTemplate(this.priceCode).then((response) => {
        this.form.priceList = response.data.priceList;
        this.form.remark = response.data.remark;
        this.form.priceCode = response.data.priceCode;
        // 价格档按开始时间 排序
        this.form.priceList.sort(this.compare('startTime'));
        this.form.priceList.forEach((price) => {
          price.startTimeStr = String(price.startTime).padStart(2, '0') + ':00';
        });
        this.checkPrice();
        this.loading = false;
      });
    },
    /** 删除价格档 */
    handleDeletePrice(index) {
      let _this = this;
      this.$modal.confirm('确认删除吗?')
        .then(() => {
          _this.form.priceList.splice(index, 1);
          _this.$modal.msgSuccess('删除成功');
        })
        .catch(function () {});
    },
    addPriceRow() {
      let price = {
        startTimeStr: undefined,
        elecPrice: undefined,
        servicePrice: undefined,
        priceType: undefined
      };
      console.log('表单', this.form.priceList);
      this.form.priceList.push(price);
    },
    //formName 需要验证的表单  err验证不通过的提示信息
    validateForm(formItem, err) {
      let result = new Promise(function (resolve, reject) {
        formItem.validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject(err);
          }
        });
      });
      this.resultArr.push(result);
    },
    /** 提交按钮 */
    async doSave() {
      //每次提交前重置验证返回结果的数组
      this.resultArr = [];
      let self = this;
      if (this.$refs.price == null || this.$refs.price.length == 0) {
        self.$modal.msgError('请添加价格档');
        return;
      }

      this.$refs.price.forEach(async (priceForm, index) => {
        this.validateForm(priceForm, 'error index: ' + index);
      });

      if (this.checkResult == 'RepeatError') {
        this.$modal.msgError('计费时段有重复，请修改');
        return;
      }
      if (this.checkResult == 'PeriodError') {
        this.$modal.msgError('请覆盖所有计费时段');
        return;
      }

      Promise.all(this.resultArr)
        .then(async function () {
          //验证全部通过
          if (self.form.priceCode != null) {
            //更新价格模板
            let response = await updatePriceTemplate(self.form);
            if (response && response.code === 200) {
              self.$modal.msgSuccess('更新价格模板成功');
              self.$emit('success');
            }
          } else {
            //新增价格模板
            let data = self.handlePriceData();
            let response = await addPriceTemplate(data);
            if (response && response.code === 200) {
              self.$modal.msgSuccess('新增模板成功');
              self.$emit('success');
            }
          }
        })
        .catch(function (data) {
          //验证失败 提示reject失败状态的值
          self.$message.error(data);
        });
    },
    handlePriceData() {
      let priceList = clone(this.form.priceList);
      priceList.forEach((priceForm, index) => {
        // 将时间段转为int
        priceForm.startTime = Number(priceForm.startTimeStr.slice(0, 2));
        delete priceForm.startTimeStr;
      });

      let data = {
        remark: this.form.remark,
        priceCode: this.form.priceCode,
        priceList
      };
      return data;
    },
    checkPrice() {
      let totalHours = 0;
      let isRepeat = false;
      let isCovered = false;
      for (let index = 0; index < this.form.priceList.length; index++) {
        let price = this.form.priceList[index];
        if (price.startTimeStr != null) {
          let startTime = price.startTimeStr.slice(0, 2);
          if (startTime == '00') isCovered = true;
          for (let next = index + 1; next < this.form.priceList.length; next++) {
            let nextP = this.form.priceList[next];
            if (nextP.startTimeStr != null) {
              let nextStart = nextP.startTimeStr.slice(0, 2);
              if (startTime == nextStart) {
                isRepeat = true;
                break;
              }
            }
          }
          if (isRepeat == true) break;
        }
      }
      if (isRepeat == true) {
        this.alertTitle = '计费时段有重复';
        this.alertType = 'warning';
        this.checkResult = 'RepeatError';
      } else if (isCovered == true) {
        this.alertTitle = '已覆盖所有计费时段';
        this.alertType = 'success';
        this.checkResult = 'Success';
      } else {
        this.alertTitle = '未覆盖所有计费时段';
        this.alertType = 'warning';
        this.checkResult = 'PeriodError';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.time-str {
  margin-right: 10px;
}
.form-alert {
  margin-top: 5px;
}
</style>
