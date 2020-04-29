import IUserInfo from "@/constant/DataModel/IUserInfo";
export default interface IToken {
  // 这里定义接口方法的返回类型
  token: string; // token
  loginUserInfo: IUserInfo; // 登录用户信息
}