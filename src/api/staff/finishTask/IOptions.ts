import IGardenAttachmentResp from "@/api/dto/IGardenAttachmentResp";
export default interface IOptions {
  taskDetailId: number; // 任务明细id
  fulfillPictures: IGardenAttachmentResp[]; // 完成图片
  remark: string; // 完成情况说明
}