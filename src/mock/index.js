module.exports = {
  mock: (app) => {
    // 加载mock配置
    const config = require("./mockConfig");

    // 如果打开了mock总开关
    if (config.filter) {
      // 定义了待mock的对象
      if (config.apiFilter && config.apiFilter.length > 0) {
        config.apiFilter.forEach(k => {
          if (k.filter) {
            switch (k.method) {
              case "get":
                app.get(k.url, (req, res, next) => {
                  res.json(k.response);
                });
                break;
              case "post":
                app.post(k.url, (req, res, next) => {
                  res.json(k.response);
                });
                break;
              case "put":
                app.put(k.url, (req, res, next) => {
                  res.json(k.response);
                });
                break;
              case "patch":
                app.patch(k.url, (req, res, next) => {
                  res.json(k.response);
                });
                break;
              case "delete":
                app.delete(k.url, (req, res, next) => {
                  res.json(k.response);
                });
                break;
            }
          }
        });
      }
    }
  }
}