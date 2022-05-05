import {Options, ResponseType} from "../services/http/http";

export const prepareData = (data: any): Options => {
  return {
    headers: {
      'content-type': 'application/json',
    },
    responseType: ResponseType.json,
    withCredentials: true,
    data: data
  }
}
