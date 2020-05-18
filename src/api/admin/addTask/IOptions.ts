export default interface IOptions {
  content: string; // 养护内容
  endDate: number; // 任务结束时间
  intro: string; // 养护详细
  logicArea: string; // 逻辑区域
  objId: number; // 养护对象id
  objName?: string; // 养护对象名称
  objType: number; //  养护对象类型：1植物，2建筑
  remark?: string; // 备注
  serialNo?: string; // 任务编号
  startDate: number; // 任务开始时间
  zoneId: number; //  所属园区id
}