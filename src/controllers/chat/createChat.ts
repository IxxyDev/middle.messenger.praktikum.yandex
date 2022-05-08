import { CreateChat } from "../../api/chat/chat-api";
import { CreateChatResponse, ErrorResponse } from "../../api/interfaces";
import { prepareData } from "../prepareData";
import { GetChatsController } from "./getChats";
import { isErrorResponse } from "../../shared/utils/isErrorResponse";

const createChatApi = new CreateChat()

export class CreateChatController {
  static async createChat(data: { title: string }): Promise<void> {
    try {
      const res: CreateChatResponse | ErrorResponse =
        await createChatApi.create(prepareData(data))
      if (isErrorResponse(res)) throw new Error(res.reason)
      const chats = await GetChatsController.getChats()
    } catch (e) {
      console.error(e)
    }
  }
}
