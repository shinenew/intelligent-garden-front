export default interface IOptions {
  // 这里定义接口方法的请求参数类型
  userName: string; // 帐号
  userPwd: string; // 密码
  thirdSys: number; // 三方系统：1微信
  thirdAcct: string; // 三方帐号
}