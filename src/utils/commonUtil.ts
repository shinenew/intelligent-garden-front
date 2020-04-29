class CommonUtil {

  /***************************** 对象 相关 *****************************/
  /**
   * JSON对象转查询字符串
   * @param jsonObj json对象
   */
  static jsonToQStr(jsonObj: object): string {
    let str: string = "";
    for (const key of Object.entries(jsonObj)) {
      const tmp: string = key[0] + "=" + key[1];
      str += tmp + "&";
    }

    return str.length > 0 ? str.substr(0, str.length - 1) : str;
  }

  /**
   * 从查询字符串中获取指定参数值
   * @param name 参数名称
   * @param queryStr 查询字符串
   */
  static getUrlParam(name: string, queryStr: string): string | null {
    var reg: RegExp = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r: RegExpMatchArray | null = queryStr.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  /***************************** 日期/时间 相关 *****************************/
  /**
   * 获取日期的时间戳
   * @param date 时间
   * @param accuracy 精确度，s秒，ms毫秒，默认为s
   */
  static getTimeSpan(date: Date = new Date(), accuracy: string = "s"): number {
    if (accuracy === "s") {
      return Math.ceil(date.getTime() / 1000);
    }

    return date.getTime();
  }

  /**
   * 校验是否为正确的日期
   * @param date 待校验的日期
   */
  static isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  /**
   * 计算2个日期的差
   * @param d1 日期1
   * @param d2 日期2
   * @param unit 单位：s秒，m分钟，h小时，d天
   */
  static getTimeDiff(d1: string, d2: string, unit: string): number | null {
    try {
      const date1: number = Date.parse(d1);
      const date2: number = Date.parse(d2);
      const dateDiff: number = date2 - date1;
      switch (unit) {
        case "s": // 秒
          return Math.ceil(dateDiff / 1000);
        case "m": // 分钟
          return Math.ceil(dateDiff / (1000 * 60));
        case "h": // 小时
          return Math.ceil(dateDiff / (1000 * 60 * 60));
        case "d": // 天
          return Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
        default:
          return dateDiff;
      }
    } catch (e) {
      return null;
    }
  }

  /**
   * 获取日期对象
   * @param dateObj 日期对象，可以是日期字符串，时间戳，时间戳字符串
   */
  static getDate(dateObj: any): Date | null {
    let date: Date = new Date(dateObj);
    if (!this.isValidDate(date)) {
      if (dateObj instanceof Date) {
        date = dateObj;
      } else if (typeof (dateObj) === "number") {
        if (dateObj.toString().length === 13) {
          date = new Date(dateObj);
        } else if (dateObj.toString().length === 10) {
          date = new Date(dateObj * 1000);
        } else {
          return null;
        }
      } else if (typeof (dateObj) === "string") {
        if (dateObj.length === 13) {
          date = new Date(parseInt(dateObj, 10));
        } else if (dateObj.length === 10) {
          date = new Date(parseInt(dateObj, 10) * 1000);
        } else {
          return null;
        }
      }
    }
    return date;
  }

  /**
   * 日期格式化
   * @param {Object} date 待格式化日期，可以是Date类型，也可以是时间戳（支持10位和13位），还可以是时间戳字符串（支持10位和13位）
   * @param {String} fmt 格式化方式，默认为：yyyy-MM-dd hh:mm:ss
   */
  static formatDate(dateObj: any, fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
    let date: Date | null = this.getDate(dateObj);
    if (date === null || !this.isValidDate(date)) {
      return "";
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    let o: any = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };

    // 日期左补零
    function padLeftZero(str: string): string {
      return ("00" + str).substr(str.length);
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str: string = o[k] + "";
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  }

  /**
   * 计算日期
   * @param date 待计算的日期
   * @param unit 计算单位：s秒，m分钟，h小时，d天
   * @param n 计算数值，增加为+，减少为-
   */
  static dateComputed(dateObj: any, unit: string, n: number): Date | null {
    let date: Date | null = this.getDate(dateObj);
    if (date === null || !this.isValidDate(date)) {
      return null;
    }

    let result: number = date.getTime();
    switch (unit) {
      case "s":
        result += n * 1000;
        break;
      case "m": // 分钟
        result += n * 1000 * 60;
        break;
      case "h": // 小时
        result += n * 1000 * 60 * 60;
        break;
      case "d": // 天
        result += n * 1000 * 60 * 60 * 24;
        break;
      default:
        return null;
    }

    return new Date(result);
  }

  /***************************** 正则 相关 *****************************/
  /**
   * 是否手机号码
   * @param {String} str 待校验字符串
   */
  static isMobile(str: string): boolean {
    var myreg: RegExp = /^[1][3,4,5,7,8][0-9]{9}$/;
    return myreg.test(str);
  }

  /**
   * 是否邮箱
   * @param {String} str 待校验字符串
   */
  static isEmail(str: string): boolean {
    var myemail: RegExp = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    return myemail.test(str);
  }

  /**
   * 是否有效身份证号码
   * @param {String} str  待校验字符串
   */
  static isIdCard(str: string): boolean {
    var myid: RegExp = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    return myid.test(str);
  }

  /***************************** 缓存 相关 *****************************/
  /**
   * 从缓存中读取数据
   * @param key 保存的key
   */
  static getObjFromStorage(key: string): any | null {
    const userState: string | null = sessionStorage.getItem(key);
    if (userState) {
      try {
        return JSON.parse(userState);
      } catch (e) {
        return null;
      }
    }

    return null;
  }

  /**
   * 保存数据到缓存中
   * @param key 保存的key
   * @param data 保存的数据
   */
  static saveStorage(key: string, data: any): void {
    const CircularJSON: any = require("circular-json"); // 避免JSON序列化时循环引用
    sessionStorage.setItem(key, CircularJSON.stringify(data));
  }

  /**
   * 从缓存中移除某个数据
   */
  static removeStorage(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * 清空缓存
   */
  static clearStorage(): void {
    sessionStorage.clear();
  }

  /**
   * 获取保护级别
   */
  static getProtectionLevelName(val: string): string {
    switch (val) {
      case "1":
        return "濒危保护植物";
      case "2":
        return "渐危保护植物";
      case "3":
        return "稀有保护植物";
      default:
        return "";
    }
  }
}

export default CommonUtil;