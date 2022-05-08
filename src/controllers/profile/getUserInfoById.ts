import { GetUserInfo, GetUserInfoById } from "../../api/profile/profile-api";
import { ResponseType } from "../../services/http/http";
import { ErrorResponse, GetUserInfoResponse } from "../../api/interfaces";
import store from "../../shared/store/store";
import { SettingsPageProps } from "../../pages/settings/interfaces";
import { formImgSrc } from "../../shared/utils/formImgSrc";
import { isErrorResponse } from "../../shared/utils/isErrorResponse";

const getUserInfoByIdApi = new GetUserInfoById()

export class GetUserInfoByIdController {
  static async getInfoById(userId: string): Promise<GetUserInfoResponse | void> {
    try {
      const res: GetUserInfoResponse | ErrorResponse =
        await getUserInfoByIdApi.read({ withCredentials: true, responseType: ResponseType.json})
      if (isErrorResponse(res)) throw new Error(res.reason)
    } catch (e) {
      console.error(e)
    }
  }
}
