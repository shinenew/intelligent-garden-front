import IGardenAttachmentResp from "@/api/dto/IGardenAttachmentResp";
export default interface IData {
  // 这里定义接口方法的返回类型
  // eg:
  companyId: number; // 所属养护公司id
  companyName: string; // 养护公司名称
  content: string; // 养护内容
  createTime: number; // 任务创建时间
  endDate: number; // 任务结束时间
  finishTime: number; // 任务完成时间
  fulfillPictures: IGardenAttachmentResp[]; // 完成图片
  id: number; // id
  intro: string; // 养护详细
  logicArea: string; // 逻辑区域
  mobile: string; // 养护工电话
  objId: number; // 养护对象id
  objName: string; // 养护对象名称
  objType: number;// 养护对象类型：1植物，2建筑
  remark: string; // 完成情况说明
  serialNo: string; // 任务编号
  staffId: number; // 执行人id
  staffName: string; // 执行人名称
  startDate: number; // 任务开始时间
  startTime: number; // 任务领取时间
  status: number; // 状态：0未领取，1进行中，9已完成
  taskId: number;// 所属任务id
  taskRemark: string; // 备注说明
  zoneId: number; // 所属园区id
  zoneName: string; // 园区名称
}