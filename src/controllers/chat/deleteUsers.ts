import { DeleteUsers } from '../../api/chat/chat-api'
import { DeleteUsersModel } from '../interfaces'
import { ErrorResponse } from '../../api/interfaces'
import { formPathFromArray } from '../../shared/utils/formPathFromArray'
import store from '../../shared/store/store'
import { prepareData } from '../prepareData'
import { formEventName } from '../../shared/utils/formEventName'
import { Contact, FoundChatsProps } from '../../components/FoundChats/interfaces'
import { GetChatsController } from './getChats'

const deleteUsersApi = new DeleteUsers()

const mapDataToStore = (ids: number[]): FoundChatsProps => {
  const state = store.getState()

  const deleteUserFromChats = (foundChats: Contact[] | []) => {
    const filteredChats = foundChats.filter((chat) => !ids.includes(chat.id))

    if (!filteredChats.length) {
      GetChatsController.getChats()
    }

    return filteredChats
  }

  return {
    ...state.chatPage.deleteUserPopup.foundChats,
    chats: deleteUserFromChats(state.chatPage.deleteUserPopup.foundChats.chats),
  }
}

export class DeleteUsersController {
  static async deleteUsers(data: DeleteUsersModel): Promise<void> {
    try {
      const res: ErrorResponse | undefined = await deleteUsersApi.delete(prepareData(data))
      if (res) {
        throw new Error(res.reason)
      }

      store.setState(
        formPathFromArray(['addUserPopup', 'foundChats']),
        mapDataToStore(data.users),
        formEventName('addUserPopup', 'foundChats'),
      )
    } catch (e) {
      console.error(e)
    }
  }
}
