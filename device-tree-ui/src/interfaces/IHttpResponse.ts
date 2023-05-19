export default interface IHttpResponse<T> {
    status: number;
    data: T;
    headers?: Record<string, string>;
  }