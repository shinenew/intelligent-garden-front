/**
 * 用户菜单接口
 */
export default interface INav {
  id: string; // 菜单id
  code: string; // 菜单标识，必须唯一
  name: string; // 菜单名称
  url: string; // 菜单访问url，对应路由
  parentId: string; // 父菜单id
  icon: string; // 菜单图标，如使用ant design的icon，则为icon图标对应的字符串
  childrenNav?: INav[]; // 子菜单
}