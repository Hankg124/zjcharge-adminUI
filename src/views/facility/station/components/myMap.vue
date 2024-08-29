<template>
  <div id="container"></div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  created() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.$nextTick(() => {
        // 创建地图实例
        var map = new BMapGL.Map("container");
        // 设置中心点坐标
        var point = new BMapGL.Point(116.404, 39.915);
        // 地图初始化，同时设置地图展示级别
        map.centerAndZoom(point, 15);
        // 开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true);
      })
    }
  }
}
</script>
<style>
.container {
  width: 100%;
  height: 100%;
}
</style>
