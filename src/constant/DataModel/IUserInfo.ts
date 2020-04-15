/**
 * 用户信息接口
 */
export default interface IUserInfo {
  userId: string; // 用户编号
  account: string; // 用户登录帐号
  role?: string; // 角色
  email?: string; // email
  phone?: string; // 手机
  // ……其他信息
}