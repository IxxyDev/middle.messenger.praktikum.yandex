import {AddUsers} from "../../api/chat/chat-api";
import {AddUsersModel} from "../interfaces";
import {ErrorResponse} from "../../api/interfaces";
import {formPathFromArray} from "../../shared/utils/formPathFromArray";
import store from "../../shared/store/store";
import {prepareData} from "../prepareData";
import {formEventName} from "../../shared/utils/formEventName";
import { Contact, FoundChatsProps } from "../../components/FoundChats/interfaces";

const addUsersApi = new AddUsers()

const mapDataToStore = (ids: number[]): FoundChatsProps => {
  const state = store.getState()

  const getUsersWithDisabledButton = (users: Contact[] | []) => {
    return users.map(user => {
      if (ids.includes(user.id)) {
        return {
          ...user,
          iconDisabled: true
        }
      }
      return user
    })
  }

  return {
    ...state.chatPage.addUserPopup.foundChats,
    chats: getUsersWithDisabledButton(state.chatPage.addUserPopup.foundChats.chats)
  }
}

export class AddUsersController {
  static async addUsers(data: AddUsersModel): Promise<void> {
    try {
      const res: ErrorResponse | null = await addUsersApi.update(prepareData(data))
      if (res) throw new Error(res.reason)

      store.setState(formPathFromArray(['addUserPopup', 'foundChats']),
        mapDataToStore(data.users),
        formEventName('addUserPopup', 'foundChats')
      )
    } catch (e) {
      console.error(e)
    }
  }
}
