import IgardenAttachmentResp from "@/api/dto/IgardenAttachmentResp";
export default interface IOptions {
  category: number; // 应急分类：1自然灾害，2人为破坏
  intro: string; // 应急情况说明
  level: number; // 险情等级：1一般 2紧急 3特别紧急
  objId: number; // 养护对象id
  objType: number; // 养护对象类型：1植物，2建筑
  scenePictures: IgardenAttachmentResp[]; // 险情图片
}