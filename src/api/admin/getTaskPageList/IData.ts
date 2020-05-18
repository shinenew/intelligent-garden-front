export default interface IData {
  total: number;
  items: {
    companyId: number; // 所属养护公司id
    companyName: string; // 所属养护公司名称
    content: string; // 养护内容
    createTime: number; // 创建时间
    endDate: number; // 任务结束时间
    id: number; // 任务id
    intro: string; // 养护详细
    logicArea: string; // 逻辑区域
    objId: number; // 养护对象id
    objName: string; // 养护对象名称
    objType: number; // 养护对象类型：1植物，2建筑
    remark: string; // 备注说明
    serialNo: string; // 任务编号
    startDate: number; // 任务开始时间
    status: number; // 状态：0未指派，1执行中，-1作废，9已完成
    taskDetailList: any[]; // 任务详情
    updateTime: number; // 修改时间
    zoneId: number; // 所属园区id
    zoneName: string; // 所属园区名称
  }[];
}