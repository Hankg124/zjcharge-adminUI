<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts';
import resize from './mixins/resize';
import { markRaw } from 'vue';

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if (this.chart) {
          this.chart.clear();
          this.chart.setOption(val);
          this.chart.resize();
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      // console.log(this.chart + '77777777777777');
    });
  },
  beforeUnmount() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = markRaw(echarts.init(this.$el, 'macarons'));
      this.chart.setOption(this.chartData);
    }
  }
};
</script>
