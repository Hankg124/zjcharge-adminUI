import { createApp } from 'vue';
// global css
import 'virtual:uno.css';
import '@/assets/styles/index.scss';
import 'element-plus/theme-chalk/dark/css-vars.css';

// App、router、store
import App from './App.vue';
import store from './store';
import router from './router';

// 自定义指令
import directive from './directive';

// 注册插件
import plugins from './plugins/index'; // plugins

// 高亮组件
// import 'highlight.js/styles/a11y-light.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import HighLight from '@highlightjs/vue-plugin';

// svg图标
import 'virtual:svg-icons-register';
import ElementIcons from '@/plugins/svgicon';

// permission control
import './permission';

// 国际化
import i18n from '@/lang/index';

// vxeTable
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
VXETable.config({
  zIndex: 999999
});

// baiduMap
import BaiduMap from 'vue-baidu-map-3x';
//基于高德地图的amap组件
//import VueAMap from 'vue-amap';
// Vant
import { Button } from 'vant';
import 'vant/lib/index.css';
// 修改 el-dialog 默认点击遮照为不关闭
import { ElDialog } from 'element-plus';
ElDialog.props.closeOnClickModal.default = false;

const app = createApp(App);
app.use(HighLight);
app.use(ElementIcons);
app.use(router);
app.use(store);
app.use(i18n);
app.use(VXETable);
app.use(BaiduMap, {
  //ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  // ak: 'Lqy3JPajMEXWP8mElLDJTXog8LjoqTI1',
  ak: 'yLO4PVhv5Ub6dUHY4mlZ5fIeGjpddXR0',
  v: '3.0', // 默认3.0
  type: 'WebGL' //默认AP (使用此模式 BMap=BMapGL)
});
// app.use(VueAMap, {
//   key: '95c618d3cfd88b118d2d1b77fea5b807',
//   plugin: [
//     'AMap.Autocomplete',
//     'AMap.PlaceSearch',
//     'AMap.Scale',
//     'AMap.OverView',
//     'AMap.ToolBar',
//     'Geocoder',
//     'AMap.PolyEditor',
//     'AMap.CircleEditor',
//     'Geolocation'
//   ],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// });

app.use(Button);

app.use(plugins);
// 自定义指令
directive(app);

app.mount('#app');
