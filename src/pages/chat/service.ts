import {HandleError} from '../../services/error';
import {ElementEvents} from '../../shared/global';
import {router} from '../../routes';
import store from '../../shared/store/store';
import {formPathFromArray} from '../../shared/utils/formPathFromArray';
import {CHAT_EVENT} from './events';
import {formEventName} from '../../shared/utils/formEventName';
import {ChatProps} from '../../components/Chat/interfaces';
import {GetChatTokenController} from '../../controllers/chat/getChatToken';
import {GetUserIdController} from '../../controllers/profile/getUserId';
import {IdAndAvatarModel} from '../../controllers/interfaces';
import {webSocketController} from '../../controllers/websocket/websocket';
import {GetUsersByChatController} from '../../controllers/chat/getUsersByChat';
import {AddUsersController} from '../../controllers/chat/addUsers';
import {DeleteUsersController} from '../../controllers/chat/deleteUsers';
import {CreateChatController} from '../../controllers/chat/createChat';
import {FoundChatsProps} from '../../components/FoundChats/interfaces';
import {TimeType} from '../../components/Time/interfaces';
import {GetUserInfoByIdController} from '../../controllers/profile/getUserInfoById';
import {GetUserInfoResponse} from '../../api/interfaces';
import {formImgSrc} from '../../shared/utils/formImgSrc';
import {GetUsersController} from '../../controllers/chat/getUsers';
import {MessageProps} from '../../components/Message/interfaces';

class ChatsService extends HandleError {
	public chatEvents: ElementEvents = {
		click: [
			{
				id: 'goToSettings',
				fn(e) {
					e.preventDefault();
					router.go('/settings');
				},
			},
			{
				id: 'openCreateChatPopup',
				fn(e) {
					e.preventDefault();
					store.setState(
						formPathFromArray(['chatPage', 'createChatPopup']),
						{
							...store.getState().chatPage.createChatPopup,
							isOpened: true,
						},
						formEventName(CHAT_EVENT, 'createChatPopup'),
					);
				},
			},
			{
				id: 'createChatPopup',
				fn(e) {
					const popup = (e.target as HTMLElement).getAttribute('id');
					if (popup !== 'createChatPopup') {
						return;
					}

					store.setState(
						formPathFromArray(['chatPage', 'createChatPopup']),
						{
							...store.getState().chatPage.createChatPopup,
							isOpened: false,
						},
						formEventName(CHAT_EVENT, 'createChatPopup'),
					);
				},
			},
			{
				id: 'closeCreateChatPopup',
				fn() {
					store.setState(
						formPathFromArray(['chatPage', 'createChatPopup']),
						{
							...store.getState().chatPage.createChatPopup,
							isOpened: false,
						},
						formEventName(CHAT_EVENT, 'createChatPopup'),
					);
				},
			},
			{
				id: 'chatsList',
				async fn(e) {
					const chatElement = (e.target as HTMLElement).closest('.chat');
					if (!chatElement) {
						return;
					}

					const {chats} = store.getState().chatPage.chatsList;

					const currentChat = chats.find((chat: ChatProps) => chat.id === Number(chatElement.id));
					const token = await GetChatTokenController.getChatToken(Number(chatElement.id));
					const user: IdAndAvatarModel = await GetUserIdController.getUserId();
					if (webSocketController.isOpened) {
						webSocketController.closeConnection();
					}

					startChat(user, currentChat, token);
				},
			},
			{
				id: 'addUser',
				fn() {
					store.setState(
						formPathFromArray(['chatPage', 'usersMenu']),
						{
							...store.getState().chatPage.usersMenu,
							isOpened: false,
						},
						formEventName(CHAT_EVENT, 'usersMenu'),
					);

					store.setState(
						formPathFromArray(['chatPage', 'usersMenu']),
						{
							...store.getState().chatPage.addUserPopup,
							isOpened: true,
						},
						formEventName(CHAT_EVENT, 'addUserPopup'),
					);
				},
			},
			{
				id: 'openUsersMenu',
				fn() {
					store.setState(
						formPathFromArray(['chatPage', 'usersMenu']),
						{
							...store.getState().chatPage.usersMenu,
							isOpened: true,
						},
						formEventName(CHAT_EVENT, 'usersMenu'),
					);
				},
			},
			{
				id: 'closeUsersMenu',
				fn() {
					store.setState(
						formPathFromArray(['chatPage', 'usersMenu']),
						{
							...store.getState().chatPage.usersMenu,
							isOpened: false,
						},
						formEventName(CHAT_EVENT, 'usersMenu'),
					);
				},
			},
			{
				id: 'deleteUser',
				fn() {
					store.setState(
						formPathFromArray(['chatPage', 'usersMenu']),
						{
							...store.getState().chatPage.usersMenu,
							isOpened: false,
						},
						formEventName(CHAT_EVENT, 'usersMenu'),
					);

					store.setState(
						formPathFromArray(['chatPage', 'deleteUserPopup']),
						{
							...store.getState().chatPage.deleteUserPopup,
							isOpened: true,
						},
						formEventName(CHAT_EVENT, 'deleteUserPopup'),
					);

					const selectedChatId = store.getState().chatPage.currentChat?.id;
					GetUsersByChatController.getUsersByChat(selectedChatId!);
				},
			},
			{
				id: 'closeAddUserPopup',
				fn(e) {
					const clickedElement = (e.target as HTMLElement).getAttribute('id');
					if (clickedElement !== 'closeAddUserPopup') {
						return;
					}

					store.setState(
						formPathFromArray(['chatPage', 'addUserPopup']),
						{
							...store.getState().chatPage.addUserPopup,
							isOpened: false,
							usersList: {
								users: [],
							},
						},
						formEventName(CHAT_EVENT, 'addUserPopup'),
					);
				},
			},
			{
				id: 'closeDeleteUserPopup',
				fn(e) {
					const clickedElement = (e.target as HTMLElement).getAttribute('id');
					if (clickedElement !== 'closeDeleteUserPopup') {
						return;
					}

					store.setState(
						formPathFromArray(['chatPage', 'deleteUserPopup']),
						{
							...store.getState().chatPage.deleteUserPopup,
							isOpened: false,
						},
						formEventName(CHAT_EVENT, 'addUserPopup'),
					);
				},
			},
			{
				id: 'addUserToChat',
				fn(e) {
					const user = (e.target as HTMLElement).closest('.foundUser');
					if (!user) {
						return;
					}

					const userId = user.getAttribute('id');
					const chatId = store.getState().chatPage.currentChat?.id;

					if (!chatId || !userId) {
						return;
					}

					AddUsersController.addUsers({
						users: [Number(userId)],
						chatId,
					});
				},
			},
			{
				id: 'deleteUserFromChat',
				fn(e) {
					const user = (e.target as HTMLElement).closest('.foundUser');
					if (!user) {
						return;
					}

					const userId = user.getAttribute('id');
					const chatId = store.getState().chatPage.currentChat?.id;

					if (!chatId || !userId) {
						return;
					}

					DeleteUsersController.deleteUsers({
						users: [Number(userId)],
						chatId,
					});
				},
			},
		],
		input: [
			{
				id: 'login',
				fn(e) {
					handleUsersSearch(e);
				},
			},
		],
		focus: [
			{
				id: 'message',
				fn: e => {
					this.HandleForm.handleFocus(e);
				},
			},
		],
		keydown: [
			{
				id: 'message',
				fn(e: KeyboardEvent) {
					if (!e.shiftKey && e.code === 'Enter') {
						e.preventDefault();
						const input = (e.target as HTMLInputElement);

						if (!input.value) {
							return;
						}

						webSocketController.send(input.value);
						input.value = '';
					}
				},
			},
		],
		submit: [
			{
				id: 'message',
				fn: e => {
					e.preventDefault();
					const input = (e.target as HTMLInputElement);
					const isValid = this.validateElements(e, 'chat', CHAT_EVENT);
					if (!isValid) {
						return;
					}

					const formData = this.HandleForm.handleSubmit(e);
					if (!formData) {
						return;
					}

					webSocketController.send(formData.message);
					input.value = '';
				},
			},
			{
				id: 'createChat',
				fn: e => {
					e.preventDefault();
					const formData = this.HandleForm.handleSubmit(e);
					if (!formData) {
						return;
					}

					CreateChatController.createChat({title: formData.chat_name});
				},
			},
		],
	};
}

const startChat = (currentUser: IdAndAvatarModel, currentChat: ChatProps, token: string): void => {
	webSocketController.start(currentUser.id, currentChat.id, token).then((isStarted: boolean) => {
		if (isStarted) {
			GetUsersByChatController.getUsersByChat(currentChat.id).then(() => {
				webSocketController.getLastMessages(messages => {
					if (!messages) {
						return;
					}

					const {users} = store.getState().chatPage.deleteUserPopup.foundChats;
					const {chats} = store.getState().chatPage.chatsList;
					const getAvatar = (userId: number) => users.find((user: FoundChatsProps) => user.id === userId)?.avatar.imgSrc ?? null;

					const updatedMessages = messages.map(message => ({
						isMe: currentUser.id === message.user_id,
						text: message.content,
						avatar: {
							imgSrc: getAvatar(message.user_id),
							size: '36px',
						},
						time: {
							type: TimeType.Chat,
							date: new Date(message.time),
						},
					}));

					const getActiveChats = (chats: ChatProps[]) => chats.map(chat => {
						if (chat.id === Number(currentChat.id)) {
							return {
								...chat,
								newMessagesCount: 0,
								text: updatedMessages[0]?.text,
								time: updatedMessages[0]?.time ?? null,
								isActive: true,
							};
						}

						return {
							...chat,
							isActive: false,
						};
					});

					store.setState(
						formPathFromArray(['chatPage']),
						{
							...store.getState().chatPage,
							currentChat,
							chatsList: {
								chats: getActiveChats(chats),
							},
							messagesList: {
								messages: updatedMessages.reverse(),
							},
							contactName: currentChat.contactName,
							avatar: {
								imgSrc: currentChat.avatar.imgSrc,
								size: '36px',
							},
						},
						formEventName(CHAT_EVENT, 'chatsList'),
					);

					subscribeToMessage(currentUser);
				});
			});
		}
	});
};

const subscribeToMessage = (currentUser: IdAndAvatarModel): void => {
	webSocketController.subscribe(message => {
		if (!message) {
			return;
		}

		GetUserInfoByIdController.getInfoById(message.user_id).then((res: GetUserInfoResponse) => {
			const messages = store.getState().chatPage.messagesList.messages as MessageProps[];
			const {chats} = store.getState().chatPage.chatsList;
			const selectedChatId = store.getState().chatPage.currentChat?.id;

			const newMessage = {
				isMe: currentUser.id === res.id,
				text: message.content,
				avatar: {
					imgSrc: formImgSrc(res.avatar),
					size: '36px',
				},
				time: {
					type: TimeType.Chat,
					date: new Date(),
				},
			};

			messages.push(newMessage);
			const updatedChats = chats.map(chat => {
				if (chat.id === selectedChatId) {
					return {
						...chat,
						text: newMessage.text,
						time: newMessage.time,
					};
				}

				return chat;
			});

			store.setState(
				formPathFromArray(['chatPage', 'chatsList']),
				{
					...store.getState().chatPage.chatsList,
					chats: updatedChats,
				},
				formEventName(CHAT_EVENT, 'chatsList'),
			);

			store.setState(
				formPathFromArray(['chatPage', 'messagesList']),
				{
					...store.getState().chatPage.messagesList,
					messages,
				},
				formEventName(CHAT_EVENT, 'messagesList'),
			);
		});
	});
};

const handleUsersSearch = (e: Event) => {
	const text = (e.target as HTMLInputElement).value;
	if (!text) {
		return;
	}

	GetUsersController.getUsers({login: text});
};

export const {chatEvents} = new ChatsService();
