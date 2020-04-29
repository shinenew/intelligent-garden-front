import ITaskDetailResp from "../getTaskDetailDetail/IData";
export default interface IData {
  // 这里定义接口方法的返回类型
  total: number;
  items: ITaskDetailResp[];
}