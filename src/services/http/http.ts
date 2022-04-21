import {Indexed} from "../../shared/global";

export enum HTTPMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export enum ResponseType {
  default = '',
  json = 'json',
  document = 'document',
  text = 'text'
}

export type Options = {
  data?: Indexed | FormData
  headers?: Record<string, string>
  withCredentials?: boolean
  responseType?: ResponseType
}

type Method = typeof HTTPMethods[keyof typeof HTTPMethods]

export class Http {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async request<T>(url: string, {
    data,
    method,
    headers,
    withCredentials,
    responseType = ResponseType.default
  }: Options & Method): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, `${this.baseUrl}${url}`)
      xhr.responseType = responseType

      if (headers) Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
      if (withCredentials) xhr.withCredentials = true

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new Error(`An error occurred while sending: ${xhr.status}`));
      };


      if (method === HTTPMethods.get && !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    })
  }

  async get<T>(url: string, options: Options = {} as Options): Promise<T> {

  }
}
