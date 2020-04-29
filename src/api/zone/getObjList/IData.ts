import IGardenAttachmentResp from "@/api/dto/IGardenAttachmentResp";
export default interface IData {
  // 这里定义接口方法的返回类型
  // eg:
  // name: string;
  total: number;
  items: {
    id: number;
    objName: string;
    objType: number; // 1植物，建筑
    pictList: IGardenAttachmentResp[]; // 植物/建筑图片
    zoneId: number; // 所属园区id
    zoneName: string; // 园区名称
  }[];
}