import axios, { AxiosInstance } from "axios";
import ContentType from "@/constant/Enum/HttpContentType";
import HttpMethod from "@/constant/Enum/HttpMethod";
import IReturnResult from "@/constant/DataModel/IReturnResult";
import CommonUtil from "@/utils/commonUtil";
import store from "@/store";

/**
 * 发起ajax请求
 * @param func 请求方法
 * @param apiUrl 接口地址（相对地址）
 * @param param 请求参数
 * @param contentType 发起请求的contentType，默认为application/json，如果是文件上传，请设置为multipart/form-data
 */
const request: any = (func: string, apiUrl: string, param?: object, contentType: ContentType = ContentType.JSON) => {
  let config: object = {
    timeout: 60 * 1000, // 超时时间
    // withCredentials: true, // Check cross-site Access-Control
  };

  // 创建axios实例
  const _axios: AxiosInstance = axios.create(config);

  /**
   * 请求过滤器
   * 本地mock数据逻辑可在此添加
   */
  _axios.interceptors.request.use(
    (config) => {
      // 开发环境才启动mock
      let mockFilter: boolean = false;
      if (process.env.NODE_ENV === "development") {
        const mockConfig: any = require("../mock/mockConfig.js");

        // 检查当前url是否打开了mock开关
        const filterApi: [] = mockConfig.apiFilter.filter((k: any) => k.url === config.url && k.filter);
        mockFilter = mockConfig.filter && filterApi !== null && filterApi.length > 0;
      }
      if (!mockFilter) {
        // 未打开mock开关的，使用配置的接口地址拼接接口路径
        config.url = process.env.VUE_APP_ENV_API_URL + config.url;
      }

      // 如果是get方法，并且请求url是一个绝对地址，则将data中的内容转换为查询字符串附加到请求url中
      if (config.method === HttpMethod.GET && config.url && config.data) {
        // json对象转数组
        const qStr: string = CommonUtil.jsonToQStr(config.data);
        if (qStr) {
          if (config.url.indexOf("?") < 0) {
            config.url += "?" + qStr;
          } else {
            config.url += qStr;
          }
        }
      }
      return config;
    },
    (error) => {
      // do something with request error
      return Promise.reject(error);
    }
  );

  /**
   * 响应过滤器
   * 如果后端返回的接口类型不是IReturnResult类型，则可以在这里进行封装
   */
  _axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // 将错误信息封装为IReturnResult对象返回
      if (error.response) {
        if (error.response.status === 404) {
          let returnResult: IReturnResult<any> = {
            success: false,
            errCode: 404,
            errMsg: "Page Not Found", // 这里应该是根据当前语言环境确定要赋予哪个语言的变量给errMsg，此处忽略了这个逻辑
            data: null,
          };
          error.response.data = returnResult;
        } else {
          let returnResult: IReturnResult<any> = {
            success: false,
            errCode: error.response.data.errcode,
            errMsg: error.response.data.errmsg_cn, // 这里应该是根据当前语言环境确定要赋予哪个语言的变量给errMsg，此处忽略了这个逻辑
            data: null,
          };
          error.response.data = returnResult;
        }

        return Promise.resolve(error.response); // 注意要用resolve，不用用reject，因为网络错误，这里也当做正确响应
      }

      return Promise.reject(error);
    }
  );

  /**
   * 设置请求header
   */
  const setHeader: any = () => {
    let header: any = {
      "Content-Type": contentType,
    };

    // 从vuex中获取登录accessToken
    // 因为启用了namespace，所以无法通过store.getters.user.accessToken来获取模块中的getter数据了
    // 需要在getters中加上namespace路径store.getters["user/accessToken"]
    if (store && store.getters && store.getters["user/accessToken"]) {
      const accessToken: string | null = store.getters["user/accessToken"];
      if (accessToken) {
        header.Authorization = "Bearer " + accessToken;
      }
    }
    return header;
  };

  return new Promise((resolve, reject) => {
    _axios({
      url: apiUrl,
      method: func,
      headers: setHeader(),
      data: param
    }).then(res => {
      // 成功
      resolve(res.data);
    }).catch(res => {
      // 失败
      reject(res);
    });
  });
};

export default {
  request,
};
