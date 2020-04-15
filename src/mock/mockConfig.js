/**
 * mock配置文件
 * filter：mock总开关
 * apiFilter：定义每个要mock的url请求
 *   url：要拦截的url，相对地址，与/src/constant/Urls中配置的相同
 *   method：要拦截的请求方法
 *   filter：url的mock开关
 *   response：mock返回的数据
 */
module.exports = {
  filter: true, // 总mock开关
  apiFilter: [{
    url: "/v1.0/users/current", // 获取当前登录用户信息
    method: "get",
    filter: true,
    response: {
      id: 1,
      email: '632433499@qq.com',
      role: 'user'
    }
  }, {
    url: "/v1.0/login", // 登录
    method: "post",
    filter: true,
    response: {
      access_token: '123456',
      access_token_exp: 1569763593,
      refresh_token: 'abcdefg',
      refresh_token_exp: 1569763593,
      nav: [{"child_ids":[5,4,10,9,13,23],"icon":"home","id":1,"name":"account","parent_id":0,"title_cn":"\u7528\u6237\u4e2d\u5fc3","title_en":"account","url":"/account"},{"child_ids":[16,19,26],"icon":"cluster","id":2,"name":"dns","parent_id":0,"title_cn":"DNS","title_en":"DNS","url":"/dns"},{"child_ids":[],"icon":"dashboard","id":5,"name":"workbench","parent_id":1,"title_cn":"\u5de5\u4f5c\u53f0","title_en":"Workbench","url":"/account/workbench"},{"child_ids":[17,18],"icon":"line-chart","id":16,"name":"flow_dns","parent_id":2,"title_cn":"\u6d41\u91cf\u76d1\u6d4b","title_en":"Flow Monitoring","url":"/dns/flow_dns"},{"child_ids":[],"icon":"","id":17,"name":"real_time_dns","parent_id":16,"title_cn":"\u5b9e\u65f6\u6d41\u91cf\u76d1\u6d4b","title_en":"Real-time flow Monitoring","url":"/dns/flow_dns/real_time_dns"},{"child_ids":[],"icon":"","id":18,"name":"history_dns","parent_id":16,"title_cn":"\u5386\u53f2\u6d41\u91cf\u76d1\u6d4b","title_en":"Historical flow Monitoring","url":"/dns/flow_dns/history_dns"},{"child_ids":[20,21,22],"icon":"cloud","id":19,"name":"domain","parent_id":2,"title_cn":"\u57df\u540d","title_en":"Domain Name","url":"/dns/domain"},{"child_ids":[],"icon":"","id":20,"name":"domain_manage","parent_id":19,"title_cn":"\u57df\u540d\u7ba1\u7406","title_en":"Domain-name Supervising","url":"/dns/domain/domain_manage"},{"child_ids":[],"icon":"","id":21,"name":"analy_manage","parent_id":19,"title_cn":"\u89e3\u6790\u8bb0\u5f55\u7ba1\u7406","title_en":"Analytical Record Management","url":"/dns/domain/analy_manage"},{"child_ids":[],"icon":"","id":22,"name":"line_manage","parent_id":19,"title_cn":"\u7ebf\u8def\u7ba1\u7406","title_en":"Line Management","url":"/dns/domain/line_manage"},{"child_ids":[],"icon":"","id":99,"name":"combine_line_manage","parent_id":19,"title_cn":"组合线路管理","title_en":"Combine Line Management","url":"/dns/domain/combine_line_manage"},{"child_ids":[24,25],"icon":"file","id":23,"name":"log","parent_id":1,"title_cn":"\u65e5\u5fd7","title_en":"Log","url":"/account/log"},{"child_ids":[],"icon":"","id":24,"name":"login_log","parent_id":23,"title_cn":"\u767b\u5f55\u65e5\u5fd7","title_en":"Login Log","url":"/account/log/login_log"},{"child_ids":[],"icon":"","id":25,"name":"operation_log","parent_id":23,"title_cn":"\u64cd\u4f5c\u65e5\u5fd7","title_en":"Operation Log","url":"/account/log/operation_log"},{"child_ids":[27],"icon":"file","id":26,"name":"log_dns","parent_id":2,"title_cn":"\u65e5\u5fd7","title_en":"Log","url":"/dns/log_dns"},{"child_ids":[],"icon":"","id":27,"name":"defend_log","parent_id":26,"title_cn":"\u9632\u62a4\u65e5\u5fd7","title_en":"Defend Log","url":"/dns/log_dns/defend_log"},{"child_ids":[29],"icon":"inbox","id":28,"name":"ip_config_0","parent_id":3,"title_cn":"IP\u914d\u7f6e","title_en":"IP Config","url":"/ddos/ip_config_0"},{"child_ids":[],"icon":"","id":29,"name":"ip_config_1","parent_id":28,"title_cn":"IP\u914d\u7f6e","title_en":"IP Config","url":"/ddos/ip_config_0/ip_config_1"}]
    }
  }]
}