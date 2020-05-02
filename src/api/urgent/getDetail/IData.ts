export default interface IData {
  category?: number; // 应急分类
  companyId?: number; // 公司id
  companyName?: string; // 公司名称
  createTime?: number; // 创建时间
  handlePictures?: any[]; // 处理图片
  id?: number; // id
  intro?: string; // 险情说明
  level?: number; // 险情等级：1一般，2紧急，3特别紧急
  objId?: number; // 养护对象id
  objName?: string; // 养护对象名称
  objType?: number; // 养护对象类型
  operateLog?: {
    id: number;
    createTime: number;
    executorId: number;
    executorMobile: string;
    executorName: string;
    finishTime: number;
    remark: string;
    status: number;
  }[]; // 操作日志
  scenePictures: any[]; // 险情图片
  serialNo?: string; // 应急编号
  staffId?: number; // 上报人id
  staffMobile?: string; // 上报人电话
  staffName?: string; // 上报人名称
  status?: number; // 状态（处理进度）：0待养护公司审核，-1作废，2待业务单位批示，3待养护公司安排，9已完成
  updateTime?: number;
  zoneId?: number; // 园区id
  zoneName?: string; // 园区名称
}