// vite.config.ts
import { loadEnv, defineConfig } from "file:///D:/Zj2/zjcharge-adminUI/node_modules/vite/dist/node/index.js";

// vite/plugins/index.ts
import vue from "file:///D:/Zj2/zjcharge-adminUI/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// vite/plugins/unocss.ts
import UnoCss from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unocss/dist/vite.mjs";
var unocss_default = () => {
  return UnoCss({
    hmrTopLevelAwait: false
    // unocss默认是true，低版本浏览器是不支持的，启动后会报错
  });
};

// vite/plugins/auto-import.ts
import AutoImport from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname = "D:\\Zj2\\zjcharge-adminUI\\vite\\plugins";
var auto_import_default = (path3) => {
  return AutoImport({
    // 自动导入 Vue 相关函数
    imports: ["vue", "vue-router", "@vueuse/core", "pinia"],
    eslintrc: {
      enabled: false,
      filepath: "./.eslintrc-auto-import.json",
      globalsPropValue: true
    },
    resolvers: [
      // 自动导入 Element Plus 相关函数ElMessage, ElMessageBox... (带样式)
      ElementPlusResolver(),
      IconsResolver({
        prefix: "Icon"
      })
    ],
    vueTemplate: true,
    // 是否在 vue 模板中自动导入
    dts: path3.resolve(path3.resolve(__vite_injected_original_dirname, "../../src"), "types", "auto-imports.d.ts")
  });
};

// vite/plugins/components.ts
import Components from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver as ElementPlusResolver2 } from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver2 from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname2 = "D:\\Zj2\\zjcharge-adminUI\\vite\\plugins";
var components_default = (path3) => {
  return Components({
    resolvers: [
      // 自动导入 Element Plus 组件
      ElementPlusResolver2(),
      // 自动注册图标组件
      IconsResolver2({
        enabledCollections: ["ep"]
      })
    ],
    dts: path3.resolve(path3.resolve(__vite_injected_original_dirname2, "../../src"), "types", "components.d.ts")
  });
};

// vite/plugins/icons.ts
import Icons from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unplugin-icons/dist/vite.js";
var icons_default = () => {
  return Icons({
    // 自动安装图标库
    autoInstall: true
  });
};

// vite/plugins/svg-icon.ts
import { createSvgIconsPlugin } from "file:///D:/Zj2/zjcharge-adminUI/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname3 = "D:\\Zj2\\zjcharge-adminUI\\vite\\plugins";
var svg_icon_default = (path3, isBuild) => {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path3.resolve(path3.resolve(__vite_injected_original_dirname3, "../../src"), "assets/icons/svg")],
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
};

// vite/plugins/compression.ts
import compression from "file:///D:/Zj2/zjcharge-adminUI/node_modules/vite-plugin-compression/dist/index.mjs";
var compression_default = (env) => {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false
        })
      );
    }
  }
  return plugin;
};

// vite/plugins/setup-extend.ts
import setupExtend from "file:///D:/Zj2/zjcharge-adminUI/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
var setup_extend_default = () => {
  return setupExtend({});
};

// vite/plugins/i18n.ts
import VueI18nPlugin from "file:///D:/Zj2/zjcharge-adminUI/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname4 = "D:\\Zj2\\zjcharge-adminUI\\vite\\plugins";
var i18n_default = (path3) => {
  return VueI18nPlugin({
    include: [path3.resolve(__vite_injected_original_dirname4, "../../src/lang/**.json")]
  });
};

// vite/plugins/index.ts
import path from "path";
var plugins_default = (viteEnv, isBuild = false) => {
  const vitePlugins = [];
  vitePlugins.push(vue());
  vitePlugins.push(unocss_default());
  vitePlugins.push(auto_import_default(path));
  vitePlugins.push(components_default(path));
  vitePlugins.push(compression_default(viteEnv));
  vitePlugins.push(icons_default());
  vitePlugins.push(svg_icon_default(path, isBuild));
  vitePlugins.push(setup_extend_default());
  vitePlugins.push(i18n_default(path));
  return vitePlugins;
};

// vite.config.ts
import path2 from "path";
var __vite_injected_original_dirname5 = "D:\\Zj2\\zjcharge-adminUI";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: env.VITE_APP_CONTEXT_PATH,
    resolve: {
      alias: {
        "~": path2.resolve(__vite_injected_original_dirname5, "./"),
        "@": path2.resolve(__vite_injected_original_dirname5, "./src")
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    plugins: plugins_default(env, command === "build"),
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://localhost:8080",
          changeOrigin: true,
          ws: true,
          rewrite: (path3) => path3.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true
        }
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    // 预编译
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "@vueuse/core",
        "echarts",
        "vue-i18n",
        "@vueup/vue-quill",
        "bpmn-js/lib/Viewer",
        "bpmn-js/lib/Modeler.js",
        "bpmn-js-properties-panel",
        "min-dash",
        "diagram-js/lib/navigation/movecanvas",
        "diagram-js/lib/navigation/zoomscroll",
        "bpmn-js/lib/features/palette/PaletteProvider",
        "bpmn-js/lib/features/context-pad/ContextPadProvider",
        "diagram-js/lib/draw/BaseRenderer",
        "tiny-svg",
        "image-conversion",
        "element-plus/es/components/text/style/css",
        "element-plus/es/components/collapse-item/style/css",
        "element-plus/es/components/collapse/style/css",
        "element-plus/es/components/space/style/css",
        "element-plus/es/components/container/style/css",
        "element-plus/es/components/aside/style/css",
        "element-plus/es/components/main/style/css",
        "element-plus/es/components/header/style/css",
        "element-plus/es/components/button-group/style/css",
        "element-plus/es/components/radio-button/style/css",
        "element-plus/es/components/checkbox-group/style/css",
        "element-plus/es/components/form/style/css",
        "element-plus/es/components/form-item/style/css",
        "element-plus/es/components/button/style/css",
        "element-plus/es/components/input/style/css",
        "element-plus/es/components/input-number/style/css",
        "element-plus/es/components/switch/style/css",
        "element-plus/es/components/upload/style/css",
        "element-plus/es/components/menu/style/css",
        "element-plus/es/components/col/style/css",
        "element-plus/es/components/icon/style/css",
        "element-plus/es/components/row/style/css",
        "element-plus/es/components/tag/style/css",
        "element-plus/es/components/dialog/style/css",
        "element-plus/es/components/loading/style/css",
        "element-plus/es/components/radio/style/css",
        "element-plus/es/components/radio-group/style/css",
        "element-plus/es/components/popover/style/css",
        "element-plus/es/components/scrollbar/style/css",
        "element-plus/es/components/tooltip/style/css",
        "element-plus/es/components/dropdown/style/css",
        "element-plus/es/components/dropdown-menu/style/css",
        "element-plus/es/components/dropdown-item/style/css",
        "element-plus/es/components/sub-menu/style/css",
        "element-plus/es/components/menu-item/style/css",
        "element-plus/es/components/divider/style/css",
        "element-plus/es/components/card/style/css",
        "element-plus/es/components/link/style/css",
        "element-plus/es/components/breadcrumb/style/css",
        "element-plus/es/components/breadcrumb-item/style/css",
        "element-plus/es/components/table/style/css",
        "element-plus/es/components/tree-select/style/css",
        "element-plus/es/components/table-column/style/css",
        "element-plus/es/components/select/style/css",
        "element-plus/es/components/option/style/css",
        "element-plus/es/components/pagination/style/css",
        "element-plus/es/components/tree/style/css",
        "element-plus/es/components/alert/style/css",
        "element-plus/es/components/checkbox/style/css",
        "element-plus/es/components/date-picker/style/css",
        "element-plus/es/components/transfer/style/css",
        "element-plus/es/components/tabs/style/css",
        "element-plus/es/components/image/style/css",
        "element-plus/es/components/tab-pane/style/css"
      ]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS9wbHVnaW5zL2luZGV4LnRzIiwgInZpdGUvcGx1Z2lucy91bm9jc3MudHMiLCAidml0ZS9wbHVnaW5zL2F1dG8taW1wb3J0LnRzIiwgInZpdGUvcGx1Z2lucy9jb21wb25lbnRzLnRzIiwgInZpdGUvcGx1Z2lucy9pY29ucy50cyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24udHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQudHMiLCAidml0ZS9wbHVnaW5zL2kxOG4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxaajJcXFxcempjaGFyZ2UtYWRtaW5VSVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1pqMi96amNoYXJnZS1hZG1pblVJL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVXNlckNvbmZpZywgQ29uZmlnRW52LCBsb2FkRW52LCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcblxuaW1wb3J0IGNyZWF0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnO1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xuICByZXR1cm4ge1xuICAgIC8vIFx1OTBFOFx1N0Y3Mlx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NTQ4Q1x1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NEUwQlx1NzY4NFVSTFx1MzAwMlxuICAgIC8vIFx1OUVEOFx1OEJBNFx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ3ZpdGUgXHU0RjFBXHU1MDQ3XHU4QkJFXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU2NjJGXHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4XHU0RTAwXHU0RTJBXHU1N0RGXHU1NDBEXHU3Njg0XHU2ODM5XHU4REVGXHU1Rjg0XHU0RTBBXG4gICAgLy8gXHU0RjhCXHU1OTgyIGh0dHBzOi8vd3d3LnJ1b3lpLnZpcC9cdTMwMDJcdTU5ODJcdTY3OUNcdTVFOTRcdTc1MjhcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjhcdTRFMDBcdTRFMkFcdTVCNTBcdThERUZcdTVGODRcdTRFMEFcdUZGMENcdTRGNjBcdTVDMzFcdTk3MDBcdTg5ODFcdTc1MjhcdThGRDlcdTRFMkFcdTkwMDlcdTk4NzlcdTYzMDdcdTVCOUFcdThGRDlcdTRFMkFcdTVCNTBcdThERUZcdTVGODRcdTMwMDJcdTRGOEJcdTU5ODJcdUZGMENcdTU5ODJcdTY3OUNcdTRGNjBcdTc2ODRcdTVFOTRcdTc1MjhcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjggaHR0cHM6Ly93d3cucnVveWkudmlwL2FkbWluL1x1RkYwQ1x1NTIxOVx1OEJCRVx1N0Y2RSBiYXNlVXJsIFx1NEUzQSAvYWRtaW4vXHUzMDAyXG4gICAgYmFzZTogZW52LlZJVEVfQVBQX0NPTlRFWFRfUEFUSCxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnfic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLycpLFxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgICB9LFxuICAgICAgZXh0ZW5zaW9uczogWycubWpzJywgJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJywgJy52dWUnXVxuICAgIH0sXG4gICAgLy8gaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy8jcmVzb2x2ZS1leHRlbnNpb25zXG4gICAgcGx1Z2luczogY3JlYXRlUGx1Z2lucyhlbnYsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgcG9ydDogTnVtYmVyKGVudi5WSVRFX0FQUF9QT1JUKSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBwcm94eToge1xuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyBlbnYuVklURV9BUFBfQkFTRV9BUEkpLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcG9zdGNzc1BsdWdpbjogJ2ludGVybmFsOmNoYXJzZXQtcmVtb3ZhbCcsXG4gICAgICAgICAgICBBdFJ1bGU6IHtcbiAgICAgICAgICAgICAgY2hhcnNldDogKGF0UnVsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhdFJ1bGUubmFtZSA9PT0gJ2NoYXJzZXQnKSB7XG4gICAgICAgICAgICAgICAgICBhdFJ1bGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBcdTk4ODRcdTdGMTZcdThCRDFcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ3BpbmlhJyxcbiAgICAgICAgJ2F4aW9zJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgICdlY2hhcnRzJyxcbiAgICAgICAgJ3Z1ZS1pMThuJyxcbiAgICAgICAgJ0B2dWV1cC92dWUtcXVpbGwnLFxuICAgICAgICAnYnBtbi1qcy9saWIvVmlld2VyJyxcbiAgICAgICAgJ2JwbW4tanMvbGliL01vZGVsZXIuanMnLFxuICAgICAgICAnYnBtbi1qcy1wcm9wZXJ0aWVzLXBhbmVsJyxcbiAgICAgICAgJ21pbi1kYXNoJyxcbiAgICAgICAgJ2RpYWdyYW0tanMvbGliL25hdmlnYXRpb24vbW92ZWNhbnZhcycsXG4gICAgICAgICdkaWFncmFtLWpzL2xpYi9uYXZpZ2F0aW9uL3pvb21zY3JvbGwnLFxuICAgICAgICAnYnBtbi1qcy9saWIvZmVhdHVyZXMvcGFsZXR0ZS9QYWxldHRlUHJvdmlkZXInLFxuICAgICAgICAnYnBtbi1qcy9saWIvZmVhdHVyZXMvY29udGV4dC1wYWQvQ29udGV4dFBhZFByb3ZpZGVyJyxcbiAgICAgICAgJ2RpYWdyYW0tanMvbGliL2RyYXcvQmFzZVJlbmRlcmVyJyxcbiAgICAgICAgJ3Rpbnktc3ZnJyxcbiAgICAgICAgJ2ltYWdlLWNvbnZlcnNpb24nLFxuXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90ZXh0L3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2xsYXBzZS1pdGVtL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2xsYXBzZS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3BhY2Uvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbnRhaW5lci9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYXNpZGUvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL21haW4vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2hlYWRlci9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnV0dG9uLWdyb3VwL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yYWRpby1idXR0b24vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NoZWNrYm94LWdyb3VwL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9mb3JtL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9mb3JtLWl0ZW0vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2J1dHRvbi9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvaW5wdXQvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2lucHV0LW51bWJlci9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3dpdGNoL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy91cGxvYWQvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL21lbnUvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvaWNvbi9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcm93L3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWcvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2RpYWxvZy9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbG9hZGluZy9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3JhZGlvLWdyb3VwL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9wb3BvdmVyL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zY3JvbGxiYXIvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3Rvb2x0aXAvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Ryb3Bkb3duL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi1tZW51L3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi1pdGVtL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zdWItbWVudS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVudS1pdGVtL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kaXZpZGVyL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jYXJkL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9saW5rL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9icmVhZGNydW1iL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9icmVhZGNydW1iLWl0ZW0vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90cmVlLXNlbGVjdC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGFibGUtY29sdW1uL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zZWxlY3Qvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL29wdGlvbi9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJlZS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYWxlcnQvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NoZWNrYm94L3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kYXRlLXBpY2tlci9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJhbnNmZXIvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYnMvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2ltYWdlL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWItcGFuZS9zdHlsZS9jc3MnXG4gICAgICBdXG4gICAgfVxuICB9O1xufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFpqMlxcXFx6amNoYXJnZS1hZG1pblVJXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9aajIvempjaGFyZ2UtYWRtaW5VSS92aXRlL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgY3JlYXRlVW5vQ3NzIGZyb20gJy4vdW5vY3NzJztcbmltcG9ydCBjcmVhdGVBdXRvSW1wb3J0IGZyb20gJy4vYXV0by1pbXBvcnQnO1xuaW1wb3J0IGNyZWF0ZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCBjcmVhdGVJY29ucyBmcm9tICcuL2ljb25zJztcbmltcG9ydCBjcmVhdGVTdmdJY29uc1BsdWdpbiBmcm9tICcuL3N2Zy1pY29uJztcbmltcG9ydCBjcmVhdGVDb21wcmVzc2lvbiBmcm9tICcuL2NvbXByZXNzaW9uJztcbmltcG9ydCBjcmVhdGVTZXR1cEV4dGVuZCBmcm9tICcuL3NldHVwLWV4dGVuZCc7XG5pbXBvcnQgY3JlYXRlSTE4biBmcm9tICcuL2kxOG4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0ICh2aXRlRW52OiBhbnksIGlzQnVpbGQgPSBmYWxzZSk6IFtdID0+IHtcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IGFueSA9IFtdO1xuICB2aXRlUGx1Z2lucy5wdXNoKHZ1ZSgpKTtcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVVbm9Dc3MoKSk7XG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQXV0b0ltcG9ydChwYXRoKSk7XG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQ29tcG9uZW50cyhwYXRoKSk7XG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudikpO1xuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUljb25zKCkpO1xuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHBhdGgsIGlzQnVpbGQpKTtcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVTZXR1cEV4dGVuZCgpKTtcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVJMThuKHBhdGgpKTtcbiAgcmV0dXJuIHZpdGVQbHVnaW5zO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxaajJcXFxcempjaGFyZ2UtYWRtaW5VSVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcdW5vY3NzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9aajIvempjaGFyZ2UtYWRtaW5VSS92aXRlL3BsdWdpbnMvdW5vY3NzLnRzXCI7aW1wb3J0IFVub0NzcyBmcm9tICd1bm9jc3Mvdml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgcmV0dXJuIFVub0Nzcyh7XG4gICAgaG1yVG9wTGV2ZWxBd2FpdDogZmFsc2UgLy8gdW5vY3NzXHU5RUQ4XHU4QkE0XHU2NjJGdHJ1ZVx1RkYwQ1x1NEY0RVx1NzI0OFx1NjcyQ1x1NkQ0Rlx1ODlDOFx1NTY2OFx1NjYyRlx1NEUwRFx1NjUyRlx1NjMwMVx1NzY4NFx1RkYwQ1x1NTQyRlx1NTJBOFx1NTQwRVx1NEYxQVx1NjJBNVx1OTUxOVxuICB9KTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFpqMlxcXFx6amNoYXJnZS1hZG1pblVJXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGF1dG8taW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9aajIvempjaGFyZ2UtYWRtaW5VSS92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtpbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInO1xuXG5leHBvcnQgZGVmYXVsdCAocGF0aDogYW55KSA9PiB7XG4gIHJldHVybiBBdXRvSW1wb3J0KHtcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgVnVlIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFxuICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAnQHZ1ZXVzZS9jb3JlJywgJ3BpbmlhJ10sXG4gICAgZXNsaW50cmM6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJyxcbiAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWVcbiAgICB9LFxuICAgIHJlc29sdmVyczogW1xuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBFbE1lc3NhZ2UsIEVsTWVzc2FnZUJveC4uLiAoXHU1RTI2XHU2ODM3XHU1RjBGKVxuICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgIHByZWZpeDogJ0ljb24nXG4gICAgICB9KVxuICAgIF0sXG4gICAgdnVlVGVtcGxhdGU6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NTcyOCB2dWUgXHU2QTIxXHU2NzdGXHU0RTJEXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XG4gICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYycpLCAndHlwZXMnLCAnYXV0by1pbXBvcnRzLmQudHMnKVxuICB9KTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFpqMlxcXFx6amNoYXJnZS1hZG1pblVJXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbXBvbmVudHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1pqMi96amNoYXJnZS1hZG1pblVJL3ZpdGUvcGx1Z2lucy9jb21wb25lbnRzLnRzXCI7aW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgKHBhdGg6IGFueSkgPT4ge1xuICByZXR1cm4gQ29tcG9uZW50cyh7XG4gICAgcmVzb2x2ZXJzOiBbXG4gICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1N0VDNFx1NEVGNlxuICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDXHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XG4gICAgICBJY29uc1Jlc29sdmVyKHtcbiAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ2VwJ11cbiAgICAgIH0pXG4gICAgXSxcbiAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vc3JjJyksICd0eXBlcycsICdjb21wb25lbnRzLmQudHMnKVxuICB9KTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFpqMlxcXFx6amNoYXJnZS1hZG1pblVJXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGljb25zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9aajIvempjaGFyZ2UtYWRtaW5VSS92aXRlL3BsdWdpbnMvaWNvbnMudHNcIjtpbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgcmV0dXJuIEljb25zKHtcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVCODlcdTg4QzVcdTU2RkVcdTY4MDdcdTVFOTNcbiAgICBhdXRvSW5zdGFsbDogdHJ1ZVxuICB9KTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFpqMlxcXFx6amNoYXJnZS1hZG1pblVJXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHN2Zy1pY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9aajIvempjaGFyZ2UtYWRtaW5VSS92aXRlL3BsdWdpbnMvc3ZnLWljb24udHNcIjtpbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XG5leHBvcnQgZGVmYXVsdCAocGF0aDogYW55LCBpc0J1aWxkOiBib29sZWFuKSA9PiB7XG4gIHJldHVybiBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYycpLCAnYXNzZXRzL2ljb25zL3N2ZycpXSxcbiAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkXG4gIH0pO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxaajJcXFxcempjaGFyZ2UtYWRtaW5VSVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29tcHJlc3Npb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1pqMi96amNoYXJnZS1hZG1pblVJL3ZpdGUvcGx1Z2lucy9jb21wcmVzc2lvbi50c1wiO2ltcG9ydCBjb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IChlbnY6IGFueSkgPT4ge1xuICBjb25zdCB7IFZJVEVfQlVJTERfQ09NUFJFU1MgfSA9IGVudjtcbiAgY29uc3QgcGx1Z2luOiBhbnlbXSA9IFtdO1xuICBpZiAoVklURV9CVUlMRF9DT01QUkVTUykge1xuICAgIGNvbnN0IGNvbXByZXNzTGlzdCA9IFZJVEVfQlVJTERfQ09NUFJFU1Muc3BsaXQoJywnKTtcbiAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcbiAgICAgIC8vIGh0dHA6Ly9kb2MucnVveWkudmlwL3J1b3lpLXZ1ZS9vdGhlci9mYXEuaHRtbCNcdTRGN0ZcdTc1MjhnemlwXHU4OUUzXHU1MzhCXHU3RjI5XHU5NzU5XHU2MDAxXHU2NTg3XHU0RUY2XG4gICAgICBwbHVnaW4ucHVzaChcbiAgICAgICAgY29tcHJlc3Npb24oe1xuICAgICAgICAgIGV4dDogJy5neicsXG4gICAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2Jyb3RsaScpKSB7XG4gICAgICBwbHVnaW4ucHVzaChcbiAgICAgICAgY29tcHJlc3Npb24oe1xuICAgICAgICAgIGV4dDogJy5icicsXG4gICAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGx1Z2luO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxaajJcXFxcempjaGFyZ2UtYWRtaW5VSVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcc2V0dXAtZXh0ZW5kLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9aajIvempjaGFyZ2UtYWRtaW5VSS92aXRlL3BsdWdpbnMvc2V0dXAtZXh0ZW5kLnRzXCI7aW1wb3J0IHNldHVwRXh0ZW5kIGZyb20gJ3VucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1cy92aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICByZXR1cm4gc2V0dXBFeHRlbmQoe30pO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcWmoyXFxcXHpqY2hhcmdlLWFkbWluVUlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxaajJcXFxcempjaGFyZ2UtYWRtaW5VSVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaTE4bi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovWmoyL3pqY2hhcmdlLWFkbWluVUkvdml0ZS9wbHVnaW5zL2kxOG4udHNcIjtpbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJztcbmV4cG9ydCBkZWZhdWx0IChwYXRoOiBhbnkpID0+IHtcbiAgcmV0dXJuIFZ1ZUkxOG5QbHVnaW4oe1xuICAgIGluY2x1ZGU6IFtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vc3JjL2xhbmcvKiouanNvbicpXVxuICB9KTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZQLFNBQWdDLFNBQVMsb0JBQW9COzs7QUNBOUIsT0FBTyxTQUFTOzs7QUNBZCxPQUFPLFlBQVk7QUFFalQsSUFBTyxpQkFBUSxNQUFNO0FBQ25CLFNBQU8sT0FBTztBQUFBLElBQ1osa0JBQWtCO0FBQUE7QUFBQSxFQUNwQixDQUFDO0FBQ0g7OztBQ053UyxPQUFPLGdCQUFnQjtBQUMvVCxTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLG1CQUFtQjtBQUYxQixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLENBQUNBLFVBQWM7QUFDNUIsU0FBTyxXQUFXO0FBQUE7QUFBQSxJQUVoQixTQUFTLENBQUMsT0FBTyxjQUFjLGdCQUFnQixPQUFPO0FBQUEsSUFDdEQsVUFBVTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1Ysa0JBQWtCO0FBQUEsSUFDcEI7QUFBQSxJQUNBLFdBQVc7QUFBQTtBQUFBLE1BRVQsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLFFBQ1osUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLGFBQWE7QUFBQTtBQUFBLElBQ2IsS0FBS0EsTUFBSyxRQUFRQSxNQUFLLFFBQVEsa0NBQVcsV0FBVyxHQUFHLFNBQVMsbUJBQW1CO0FBQUEsRUFDdEYsQ0FBQztBQUNIOzs7QUN2QnNTLE9BQU8sZ0JBQWdCO0FBQzdU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O0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFFQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJFbGVtZW50UGx1c1Jlc29sdmVyIiwgIkljb25zUmVzb2x2ZXIiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJFbGVtZW50UGx1c1Jlc29sdmVyIiwgIkljb25zUmVzb2x2ZXIiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
