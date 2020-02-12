import axios from "axios";
import { Loading, Message } from "element-ui";

// 1. 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url基础地址，解决不同数据源url变化问题
  // withCredentials: true, // 跨域时若要发送cookies需设置该选项
  // timeout: 5000 // 超时
});

let loading;

// 2. 请求拦截
service.interceptors.request.use(
  config => {
    loading = Loading.service();
    return config;
  },
  error => {
    // 请求错误预处理
    return Promise.reject(error);
  }
);

// 3. 响应拦截
service.interceptors.response.use(
  // 通过自定义code判定响应状态，也可以通过HTTP状态码判定
  response => {
    const { code, msg } = response.data;
    const { method } = response.config;
    if (code === "200") {
      if (method !== "get") {
        Message({
          showClose: true,
          type: "success",
          message: "操作成功"
        });
      }
    } else {
      Message({
        showClose: true,
        message: msg,
        type: "error"
      });
    }
    loading && loading.close();
    return response.data;
  },
  error => {
    loading && loading.close();
    Message({
      showClose: true,
      message: error.message,
      type: "error"
    });
    return Promise.reject(error);
  }
);

export default service;
