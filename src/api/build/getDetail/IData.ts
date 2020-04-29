
import IGardenAttachmentResp from "@/api/dto/IGardenAttachmentResp";
export default interface IData {
  // 这里定义接口方法的返回类型
  addrPicList: IGardenAttachmentResp[]; // 建筑位置图片
  audioList: IGardenAttachmentResp[]; // 建筑音视频
  buildTime: number; // 建设时间
  createTime: number; // 创建时间
  culture: string;// 文化历史
  engName: string; //  英文名称
  finishTime: number; // 竣工时间
  id: number; // id
  name: string; // 名称
  pictureList: IGardenAttachmentResp[]; // 建筑图片
  protectionLevel: string; // 保护级别(1:濒危 2：渐危 3：稀有 4：无)
  serialNo: string; // 编号
  status: number; // 状态：1正常，-1禁用
  updateTime: number; // 修改时间
  videoList: IGardenAttachmentResp[]; // 建筑视频
  zoneId: number; // 所属园区id
}