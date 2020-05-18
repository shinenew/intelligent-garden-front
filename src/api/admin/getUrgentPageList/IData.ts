export default interface IData {
  items: {
    category?: number; // 应急分类
    createTime?: number; // 创建时间
    id?: number; // id
    intro?: string; // 险情说明
    level?: number; // 险情等级：1一般，2紧急，3特别紧急
    objId?: number; // 养护对象id
    objName?: string; // 养护对象名称
    objType?: number; // 养护对象类型
    serialNo?: string; // 应急编号
    staffId?: number; // 上报人id
    staffMobile?: string; // 上报人电话
    staffName?: string; // 上报人名称
    status?: number; // 状态（处理进度）：0待养护公司审核，-1作废，2待业务单位批示，3待养护公司安排，9已完成
    zoneId?: number; // 园区id
    zoneName?: string; // 园区名称
  }[]; // 当前页数据
  total: number; // 总条数
  per_page: number; // 页大小
  last_page: number; // 最后一页
  current_page: number; // 当前页
}