import {GetToken} from '../../api/chat/chat-api';
import {ResponseType} from '../../services/http/http';
import {ChatTokenResponse, ErrorResponse} from '../../api/interfaces';
import {isErrorResponse} from '../../shared/utils/isErrorResponse';

const getTokenApi = new GetToken();

export class GetChatTokenController {
	static async getChatToken(chatId: number): Promise<string | void> {
		try {
			const res: ChatTokenResponse | ErrorResponse
        = await getTokenApi.read({withCredentials: true, responseType: ResponseType.JSON}, chatId);
			if (isErrorResponse(res)) {
				throw new Error(res.reason);
			}

			return res?.token;
		} catch (e) {
			console.error(e);
		}
	}
}
