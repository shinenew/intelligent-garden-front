/**
 * 用户信息接口
 */
import INav from "./INav";
export default interface IUserInfo {
  // userId: string; // 用户编号
  // account: string; // 用户登录帐号
  // role?: string; // 角色
  // email?: string; // email
  // phone?: string; // 手机
  // // ……其他信息
  id: number;
  type: number; // 99超级管理员，1养护公司，2业主单位，3养护工
  realName: string;
  mobile: string;
  position: string;
  userName: string;
  remark: string;
  createTime: number;
  updateTime: number;
  status: number;
  menus: INav[];
  thirdAccount: {
    userId: number;
    thirdSys: number; // 1微信
    thirdAcct: string; // 三方帐号
  }[];
  roles: {
    id: number;
    name: string;
    remark: string;
    isSys: number;
    createTime: number;
    updateTime: number;
    status: number;
  }[];
  relData: any; // 关联数据
}