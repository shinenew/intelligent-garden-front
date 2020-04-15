/**
 * 统一处理结果接口
 */
export default interface IReturnResult<T> {
  success: boolean; // 是否处理成功
  errCode: number; // 错误码
  errMsg: string; // 错误消息
  data: T | null; // 返回数据
}