import {Indexed} from "../global";
import {isObject} from "./isObject";

type Params = [string, string][];

export const getParams = (data: Indexed | [], key = ''): Params => {
  const result: Params = []
  for (const [k, v] of Object.entries(data)) {
    if (isObject(v) || Array.isArray(v)) {
      result.push(...getParams(v, `${key}[${k}]`))
    }
    else {
      result.push([`${key}[${k}]`, encodeURIComponent(String(v))])
    }
  }

  return result
}
