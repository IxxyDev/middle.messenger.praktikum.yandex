import {GetChats} from '../../api/chat/chat-api';
import {ResponseType} from '../../services/http/http';
import {ErrorResponse, GetChatsResponse} from '../../api/interfaces';
import store from '../../shared/store/store';
import {formPathFromArray} from '../../shared/utils/formPathFromArray';
import {formEventName} from '../../shared/utils/formEventName';
import {ChatsProps} from '../../components/Chats/interfaces';
import {TimeType} from '../../components/Time/interfaces';
import {formImgSrc} from '../../shared/utils/formImgSrc';
import {CHAT_EVENT} from '../../pages/chat/events';
import {isErrorResponse} from '../../shared/utils/isErrorResponse';

const getChatsApi = new GetChats();

const mapDataToStore = (chats: GetChatsResponse): ChatsProps => {
	const state = store.getState();

	const chatCards = chats.map(chat => ({
		id: chat.id,
		isMe: false,
		isActive: false,
		text: chat.last_message?.content,
		avatar: {
			imgSrc: formImgSrc(chat.avatar),
			size: '40px',
		},
		time: {
			type: TimeType.Chat,
			date: new Date(chat.last_message?.time),
		},
		contactName: chat.title,
		newMessagesCount: chat.unread_count,
	}));

	return {
		...state.chatPage.chatsList,
		chats: chatCards,
	};
};

export class GetChatsController {
	static async getChats(): Promise<void> {
		try {
			const res: GetChatsResponse | ErrorResponse
        = await getChatsApi.read({withCredentials: true, responseType: ResponseType.JSON});
			if (isErrorResponse(res)) {
				throw new Error(res.reason);
			}

			store.setState(
				formPathFromArray(['chatPage', 'createChatPopup']), {
					...store.getState().chatPage.createChatPopup,
					isOpened: false,
				}, formEventName(CHAT_EVENT, 'createChatPopup'));

			store.setState(
				formPathFromArray(['chatPage', 'chatsList']),
				mapDataToStore(res),
				formEventName(CHAT_EVENT, 'chatsList'),
			);
		} catch (e) {
			console.error(e);
		}
	}
}
