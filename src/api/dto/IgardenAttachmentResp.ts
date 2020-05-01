/**
 * 附件对象
 */
export default interface IGardenAttachmentResp {
  id: number; // 附件id
  name: string; // 附件名称
  remark: string; // 描述
  type: number; // 园区：1平面图，2园区图片；植物：1位置图，2植物图片，7音频，8视频；建筑：1位置图，2建筑图片，7音频，8视频；养护任务：1完成图；报表：1附件
  url: string; // url
}