import { GetUsersByChat } from "../../api/chat/chat-api";
import { ResponseType } from "../../services/http/http";
import { ErrorResponse, GetUsersResponse } from "../../api/interfaces";
import { FoundChatsProps } from "../../components/FoundChats/interfaces";
import store from "../../shared/store/store";
import { formImgSrc } from "../../shared/utils/formImgSrc";
import { isErrorResponse } from "../../shared/utils/isErrorResponse";
import { formPathFromArray } from "../../shared/utils/formPathFromArray";
import { formEventName } from "../../shared/utils/formEventName";

const getUsersByChatApi = new GetUsersByChat();

const mapDataToStore = (chatUsers: GetUsersResponse): FoundChatsProps => {
  const state = store.getState();

  const users = chatUsers.map(user => {
    return {
      id: user.id,
      fullName: `${user.first_name} ${user.second_name}`,
      avatar: {
        imgSrc: formImgSrc(user.avatar),
        size: "30px"
      }
    };
  });

  return {
    ...state.chatPage.deleteUserPopup.foundChats,
    users
  };
};

export class GetUsersByChatController {
  static async getUsersByChat(chatId: number): Promise<void> {
    try {
      const res: GetUsersResponse | ErrorResponse =
        await getUsersByChatApi.read({ withCredentials: true, responseType: ResponseType.json }, chatId);
      if (isErrorResponse(res)) throw new Error(res.reason);

      store.setState(
        formPathFromArray(["deleteUserPopup", "foundChats"]),
        mapDataToStore(res),
        formEventName("deleteUserPopup", "foundChats")
      )
    } catch (e) {
      console.error(e)
    }
  }
}
