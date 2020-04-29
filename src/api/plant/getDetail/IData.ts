
import IGardenAttachmentResp from "@/api/dto/IGardenAttachmentResp";
export default interface IData {
  addrPicList: IGardenAttachmentResp[]; // 植物位置图片
  alias: string; // 别名
  audioList: IGardenAttachmentResp[]; // 植物音视频
  createTime: number; // 创建时间
  culture: string;// 植物文化
  engName: string; //  英文名称
  geographical: string; // 地理分布
  id: number; // 植物id
  morphologicalCharacte: string; // 形态特征
  name: string; // 植物名称
  pictureList: IGardenAttachmentResp[]; // 植物图片
  plantCount: number; // 载种数量
  plantTime: number; // 栽培时间
  protectionLevel: string; // 保护级别(1:濒危 2：渐危 3：稀有 4：无)
  serialNo: string; // 编号
  status: number; // 状态：1正常，-1禁用
  type: string; // 植物种类
  typeGang: string; // 纲
  typeJie: string; // 界
  typeKe: string; // 科
  typeMen: string; // 门
  typeMu: string; // 目
  typeShu: string; // 属
  typeYagang: string; // 亚纲
  typeZhong: string; // 种
  updateTime: number; // 修改时间
  videoList: IGardenAttachmentResp[]; // 植物视频
  zoneId: number; // 所属园区
}