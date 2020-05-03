import IReturnResult from "@/constant/DataModel/IReturnResult";
import HttpMethod from "@/constant/Enum/HttpMethod";
import Urls from "@/constant/Urls";
import http from "@/utils/ajaxUtil";
import IData from "./IData";

/**
 * 注销
 */
export default async (): Promise<IReturnResult<IData>> => {
  return await http.request(HttpMethod.POST, Urls.logout, null);
};