import { ChangeUser } from "../../api/profile/profile-api";
import { Indexed } from "../../shared/global";
import { ErrorResponse, GetUserInfoResponse } from "../../api/interfaces";
import { prepareData } from "../prepareData";
import store from "../../shared/store/store";

const changeProfileApi = new ChangeUser()
const validationKeys = ['first_name', 'second_name', 'display_name', 'login', 'email', 'phone'];

const mapDataToStore = (data: GetUserInfoResponse) => {
  const state = store.getState()

  return {
    ...state.settingsPage,
    nameInput: {
      ...state.settingsPage,
      value: data.first_name
    },
    surnameInput: {
      ...state.settingsPage,
      value: data.second_name
    },
    loginInput: {
      ...state.settingsPage,
      value: data.login
    },
    emailInput: {
      ...state.settingsPage,
      value: data.email
    },
    phoneInput: {
      ...state.settingsPage,
      value: data.phone
    }
  }
}

export class ChangeProfileController {
  static async changeProfile(data: Indexed): Promise<void> {
    try {
      const isValid = validationKeys.every((key: string) => Object.keys(data).includes(key))
      if (!isValid) throw new Error('Invalid data')

      const res: GetUserInfoResponse | ErrorResponse =
        await changeProfileApi.update(prepareData(data))

      if (isErrorResponse(res)) throw new Error(res.reason)

      store.setState('settingsPage', mapDataToStore(res), UPDATE_USER_EVENT)
    } catch (e) {
      console.error(e)
    }
  }
}
