/**
 * 定义接口地址，接口完整URL，由.env.[mode]中定义的API_URL+下面定义的URL组成
 */
enum Urls {
  login = "/auth/login", // 登录
  thirdLogin = "/auth/thirdLogin", // 三方登录
  thirdBind = "/auth/thirdBind", // 三方绑定
  getZoneList = "/zone/getPageList", // 获取园区分页列表
  getZoneDetail = "/zone/getDetail", // 获取园区详情
  getPlatnDetail = "/plant/getDetail", // 获取植物详情
  getBuildDetail = "/build/getDetail", // 获取建筑详情
  getObjPageList = "/wechat/getObjectPageList", // 获取园区内的植物/建筑列表
  getStatisticsCount = "/wechat/getStatisticsCount", // 获取统计数据
  getTaskList = "/wechat/getStaffTaskDetailPageList", // 获取养护任务列表
  receiveTask = "/wechat/receive", // 领取养护任务
  finishTask = "/wechat/fulfilTask", // 完成养护任务
}

export default Urls;