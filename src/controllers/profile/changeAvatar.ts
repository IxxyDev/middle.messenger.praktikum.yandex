import { ChangeAvatar } from "../../api/profile/profile-api";
import { prepareData } from "../prepareData";
import { ErrorResponse, GetUserInfoResponse } from "../../api/interfaces";
import store from "../../shared/store/store";
import { formImgSrc } from "../../shared/utils/formImgSrc";
import { isErrorResponse } from "../../shared/utils/isErrorResponse";
import { SettingsPage } from "../../pages/settings/settings";

const changeAvatarApi = new ChangeAvatar()

const mapDataToStore = (data: GetUserInfoResponse): SettingsPage => {
  const state = store.getState()

  URL.revokeObjectURL(state.settingsPage.avatarPopup.imgSrc as string);

  return {
    ...state.settingsPage,
    imgSrc: formImgSrc(data.avatar),
    avatarPopup: {
      ...store.getState().settingsPage.avatarPopup,
      imgSrc: formImgSrc(data.avatar),
      changeAvatarButton: {
        ...store.getState().settingsPage.avatarPopup.changeAvatarButton,
        isDisabled: true,
      }
    }

  }
}

export class ChangeAvatarController {
  static async changeAvatar(data: FormData): Promise<void> {
    try {
      const res: GetUserInfoResponse | ErrorResponse =
        await changeAvatarApi.update(prepareData(data))
      if (isErrorResponse(res)) throw new Error(res.reason)

      store.setState('settingsPage', mapDataToStore(res), SETTING_PAGE_EVENT)
    } catch (e) {
      console.error(e)
    }
  }
}
