/**
 * 园区对象
 */
import IGardenAttachmentResp from "@/api/dto/IGardenAttachmentResp";
 export default interface IGardenZoneResp {
  // 这里定义接口方法的返回类型
  // eg:
  // name: string;
  address: string; //   详细地址
  area: number; // 园区面积：单位平方米
  buildCount: number; // 建筑数量
  buildTime: number; // 建设时间
  businessEnd: string; // 营业时间结束
  businessStart: string; // 营业时间开始
  city: string; // 地址市
  createTime: number; // 创建时间
  cultural: string; // 文化历史
  district: string; // 地址区
  finishTime: number; // 竣工时间
  graghList: IGardenAttachmentResp[]; // 园区平面图
  id: number; // 园区id
  intro: string; // 园区介绍
  level: number; // 园区级别：1A级，2AA级，3AAA级，4AAAA级，5AAAAA级
  linkMan: string; // 联系人
  linkTel: string; // 联系电话
  mapLat: number; // 地图坐标维度
  mapLng: number; // 地图坐标经度
  mapType: number;// 地图类型: 1百度地图
  name: string; // 名称
  pictureList: IGardenAttachmentResp[]; // 园区图片
  plantCount: number; // 植物数量
  province: string; // 地址省
  serialNo: string; // 园区编号
  status: number; // 状态：1正常，-1禁用
  traffic: string; // 交通线路
  type: number; // 园区类型：1公园，2产业园区，3工业园区，4科技园区，5其他
  updateTime: number; // 修改时间
}