/**
 * 应急对象
 */
export default interface IGardenUrgentResp {
  category: number; // 应急分类：1自然灾害，2人为破坏
  createTime: number; // 报时间
  id: number; // 应急d
  intro: string; // 险情说明
  level: number; // 险情等级：1一般 2紧急 3特别紧急
  objId: number; // 养护对象id
  objName: string; // 养护对象名称
  objType: number; // 养护对象类型：1植物，2建筑
  serialNo: string; // 应急编号
  staffId: number; // 上报人id
  staffMobile: string; // 上报人电话
  staffName: string; // 上报人姓名
  status: number; // 状态（处理进度）：0待养护公司审核，-1作废，2待业务单位批示，3待养护公司安排，9已完成
  zoneId: number; // 所属园区id
  zoneName: string; // 所属园区名称
}