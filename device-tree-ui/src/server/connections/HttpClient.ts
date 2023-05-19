import Connection from "./Connection";
import IConnectionOptions from "../../interfaces/IConnectionOptions";
import IHttpResponse from "../../interfaces/IHttpResponse";

export default class HttpClient extends Connection {

  constructor(options: IConnectionOptions) {
    super(options);
  }

  public async get<T>(url: string): Promise<IHttpResponse<T>> {
    url = this.baseUrl + url;
    const response = await fetch(url);
    const data = await response.json();
    return {
      status: response.status,
      data: data as T,
      headers: response.headers
        ? this.parseHeaders(response.headers)
        : undefined,
    };
  }

  public async post<T>(
    url: string,
    body: any
  ): Promise<IHttpResponse<T>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return {
      status: response.status,
      data: data as T,
      headers: response.headers
        ? this.parseHeaders(response.headers)
        : undefined,
    };
  }

  // TODO: Follow a similar approach to add support for other HTTP methods such as PATCH and DELETE.

  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}
