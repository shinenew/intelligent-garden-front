import IUserInfo from "./IUserInfo";
import INav from "./INav";
import { Dictionary } from "vue-router/types/router";
export default interface IRoute {
  url: string;
  anonymous: boolean;
  isLogin: boolean;
  loginInfo: IUserInfo | null;
  access: boolean;
  refuseReason: string | null;
  nav: INav | null;
  query: Dictionary<string | string[]>;
  params: Dictionary<string>;
}