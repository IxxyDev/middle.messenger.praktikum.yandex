import { Indexed } from "../../shared/global";
import { queryToString } from "../../shared/utils/queryToString";

export enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum ResponseType {
  DEFAULT = "",
  JSON = "json",
}

export type Options = {
  data?: Indexed | FormData;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  responseType?: ResponseType;
  timeout?: number;
};

type Method = typeof HTTPMethods[keyof typeof HTTPMethods];

export class Http {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(url: string, {
    data,
    method,
    headers,
    withCredentials,
    responseType = ResponseType.DEFAULT
  }: Options & { method: Method }, timeout = 10000): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this.baseUrl}${url}`);
      xhr.responseType = responseType;

      if (headers) {
        Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
      }

      if (withCredentials) xhr.withCredentials = true;

      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(new Error(`An error occurred while sending: ${xhr.status}`));

      if (method === HTTPMethods.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  async get<T>(url: string, options: Options = {} as Options): Promise<T> {
    const data = options.data ? queryToString(options.data as Indexed) : null;
    const processedUrl = data ? url + data : url;

    return this.request<T>(processedUrl,
      { ...options, method: HTTPMethods.GET },
      options.timeout);
  }

  async post<T>(url: string, options: Options): Promise<T> {
    return this.request<T>(url,
      { ...options, method: HTTPMethods.POST },
      options.timeout);
  }

  async put<T>(url: string, options: Options): Promise<T> {
    return this.request<T>(url,
      { ...options, method: HTTPMethods.PUT },
      options.timeout);
  }

  async delete<T>(url: string, options: Options): Promise<T> {
    return this.request<T>(url,
      { ...options, method: HTTPMethods.DELETE },
      options.timeout);
  }
}
