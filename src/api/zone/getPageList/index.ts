import IReturnResult from "@/constant/DataModel/IReturnResult";
import HttpMethod from "@/constant/Enum/HttpMethod";
import Urls from "@/constant/Urls";
import http from "@/utils/ajaxUtil";
import IOptions from "./IOptions";
import IData from "./IData";

/**
 * 说明：HttpMethod为请求方法枚举，下面是get方法
 * Urls为后端接口url地址枚举，需要在/src/constant/Urls/index.ts中配置，这里以xxx代替
 */
export default async (option?: IOptions): Promise<IReturnResult<IData>> => {
  return await http.request(HttpMethod.GET, Urls.getZoneList, option);
};