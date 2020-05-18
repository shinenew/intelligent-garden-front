import IPagging from "@/constant/DataModel/IPagging";
export default interface IOptions extends IPagging {
  objName?: string; // 养护对象名称
  createTimeBegin?: number; // 上报时间开始
  createTimeEnd?: number; // 上报时间结束
  status?: number; // 状态
}