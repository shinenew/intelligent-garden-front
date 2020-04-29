import IPagging from "@/constant/DataModel/IPagging";
export default interface IOptions extends IPagging {
  // 这里定义接口方法的请求参数类型
  // eg:
  // name: string;
  name?: string | null; // 园区名称
  status?: number; // 状态1正常 -1禁用
}