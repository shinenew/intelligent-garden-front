export default interface IOptions {
  handlePictures?: any; // 处理图片
  remark?: string; // 备注信息
  status?: number; // 状态：-1作废(审核不通过)，2待业主单位批示，3待养护公司安排，9已完成
  urgentId?: number; // 应急id
}