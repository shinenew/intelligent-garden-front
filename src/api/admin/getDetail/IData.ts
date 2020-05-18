export default interface IData {
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
  taskDetailList: {
    companyId: number; // 所属养护公司id
    companyName: string; // 所属养护公司名称
    content: string; // 养护内容
    createTime: number; // 创建时间
    endDate: number; // 任务结束时间
    finishTime: number; // 任务结束时间
    fulfillPictures: any[]; // 完成图片
    id: number; // 明细id
    intro: string; // 养护详细
    logicArea: string; // 逻辑区域
    mobile: string; // 养护工电话
    objId: number; // 养护对象id
    objName: string; // 养护对象名称
    objType: number; // 养护对象类型：1植物，2建筑
    remark: string; // 完成情况说明
    serialNo: string; // 任务编号
    staffId: number; // 执行人id
    staffName: string; // 执行人名称
    startDate: number; // 任务开始时间
    status: number; // 状态：0未领取，1进行中，9已完成
    taskId: number; // 任务id
    taskRemark: string; // 任务说明
    updateTime: number; // 修改时间
    zoneId: number; // 所属园区id
    zoneName: string; // 所属园区名称
  }[]; // 任务详情
  updateTime: number; // 修改时间
  zoneId: number; // 所属园区id
  zoneName: string; // 所属园区名称
}