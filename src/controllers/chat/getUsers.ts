import { GetUsers } from "../../api/chat/chat-api";
import { prepareData } from "../prepareData";
import { ErrorResponse, GetUsersResponse } from "../../api/interfaces";
import store from "../../shared/store/store";
import { formPathFromArray } from "../../shared/utils/formPathFromArray";
import { formEventName } from "../../shared/utils/formEventName";
import { formImgSrc } from "../../shared/utils/formImgSrc";
import { isErrorResponse } from "../../shared/utils/isErrorResponse";

const getUsersApi = new GetUsers()

const mapDataToStore = (foundUsers: GetUsersResponse) => {
  const state = store.getState()
  const users = foundUsers.map(user => {
    return {
      id: user.id,
      fullName: `${user.first_name} ${user.second_name}`,
      avatar: {
        imgSrc: formImgSrc(user.avatar),
        size: '30px',
      },
    }
  })

  return {
    ...state.chatPage.addUserPopup.foundChats,
    users,
  }
}

export class GetUsersController {
  static async getUsers(data: { login: string }): Promise<void> {
    try {
      const res: GetUsersResponse | ErrorResponse = await getUsersApi.read(prepareData(data))
      if (isErrorResponse(res)) throw new Error(res.reason)

      store.setState(formPathFromArray(['addUserPopup', 'foundChats']), mapDataToStore(res),
        formEventName('addUserPopup', 'foundChats'))
    } catch (e) {
      console.error(e)
    }
  }
}
