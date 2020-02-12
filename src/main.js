import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, {
  size: "small"
});

import "./styles/index.scss";

import "./icons";
import "./permission";

Vue.config.productionTip = false;
Vue.prototype.baseApi = process.env.VUE_APP_BASE_API;

import moment from "moment";
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
