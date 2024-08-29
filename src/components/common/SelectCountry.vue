<template>
  <el-select v-model="selectedId" :multiple="multiple" filterable :clearable="clearable" placeholder="请选择国家">
    <el-option v-for="(item, index) in tableData" :key="index" :label="item.short + ' ' + item.name" :value="item.short"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: [Number, String, Array],
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [
        {
          'short': 'CN',
          'name': '中国',
          'en': 'China',
          'tel': '86',
          'pinyin': 'zg'
        }
      ]
    };
  },
  computed: {
    selectedId: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  created() {},
  methods: {}
};
</script>
