/**
 * 定义接口地址，接口完整URL，由.env.[mode]中定义的API_URL+下面定义的URL组成
 */
enum Urls {
  login = "/auth/login", // 登录
  logout = "/auth/logout", // 注销
  thirdLogin = "/auth/thirdLogin", // 三方登录
  thirdBind = "/auth/thirdBind", // 三方绑定
  getZoneList = "/wechat/getZonePageList", // 获取园区分页列表
  getZoneDetail = "/wechat/getZoneDetail", // 获取园区详情
  getPlatnDetail = "/wechat/getPlantDetail", // 获取植物详情
  getBuildDetail = "/wechat/getBuildDetail", // 获取建筑详情
  getObjPageList = "/wechat/getObjectPageList", // 获取园区内的植物/建筑列表
  getStatisticsCount = "/wechat/getStatisticsCount", // 获取统计数据
  getTaskList = "/wechat/getStaffTaskDetailPageList", // 获取养护任务列表
  receiveTask = "/wechat/receive", // 领取养护任务
  finishTask = "/wechat/fulfilTask", // 完成养护任务
  getTaskDetail = "/wechat/getTaskAssignmentDetail", // 获取任务详情
  writeUrgent = "/wechat/urgentWrite", // 填写应急事件
  getUrgentList = "/wechat/urgentPageList", // 获取应急事件列表
  upload = "/attachment/upload", // 上传
  getUrgentDetail = "/urgent/getDetail", // 获取应急详情
  getBaseData = "/baseData/getAllBaseData", // 获取基础数据配置
  getAdminTaskPageList = "/task/getPageList", // 获取养护任务分页列表
  getAdminUrgentPageList = "/urgent/getPageList", // 获取应急流程分页列表
  handleUrgent = "/urgent/urgentHandle", // 处理应急事件
  getLoginUserZoneList = "/task/getMyZoneInfo", // 获取登录用户园区列表
  addTask = "/task/add", // 添加养护任务
  getTaskAdminDetail = "/task/getDetail", // 获取养护任务详情
  assign = "/task/assign", // 指派
  getStaffPageList = "/staff/getPageList", // 获取养护工分页列表
}

export default Urls;