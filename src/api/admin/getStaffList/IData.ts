export default interface IData {
  total: number;
  items: {
    companyId: number; // 所属养护公司id
    companyName: string; // 所属公司名称
    id: number; // 员工id–编辑时才需要传
    mobile: string; // 手机号码
    realName: string; // 真实姓名
    remark?: string; // 备注
    serialNo: string; // 员工编号
    status: number; // 状态：1正常，-1禁用
    userName?: string; // 登录账号
  }[];
}