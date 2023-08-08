import './assets/less/reset.less'


import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
// 配置Element-Plus
import * as ELementPluseIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/el-message.css";
// 解决element-plus自动引入后ElLoading、ElMessage、ElNotification、ElMessageBox样式丢失的问题
import "element-plus/dist/index.css";
 // 创建vue实例
const app = createApp(App)

 // 挂载pinia
app.use(store)

 // 挂载实例
app.mount('#app');


for (const [key, component] of Object.entries(ELementPluseIconsVue)) {
    app.component(key, component);
  }