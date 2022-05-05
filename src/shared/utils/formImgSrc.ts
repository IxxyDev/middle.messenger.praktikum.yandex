import { HOST } from "../../api/baseApi";

export const formImgSrc = (path: string | undefined): string | null => {
  return path ? `${HOST}/api/v2/resources${path}` : null
}
