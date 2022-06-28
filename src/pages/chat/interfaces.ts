import {Props} from '../../shared/global';
import {TimeProps} from '../../components/Time/interfaces';
import {AddUserPopupProps} from '../../components/AddUserPopup/interfaces';
import {DeleteUserPopupProps} from '../../components/DeleteUserPopup/interfaces';
import {CreateChatPopupProps} from '../../components/CreateChatPopup/interfaces';
import {ChatProps} from '../../components/Chat/interfaces';
import {UsersMenuProps} from '../../components/UsersMenu/interfaces';
import {ChatsProps} from '../../components/Chats/interfaces';
import {AvatarProps} from '../../components/Avatar/interfaces';
import {SearchPanelProps} from '../../components/SearchPanel/interfaces';
import {TopPanelProps} from '../../components/TopPanel/interfaces';
import {ErrorMessageProps} from '../../components/ErrorMessage/interfaces';
import {SendMessagePanelProps} from '../../components/SendMessagePanel/interfaces';

export interface ChatPageProps extends Props {
	chatsList: ChatsProps;
	avatar: AvatarProps;
	searchPanel: SearchPanelProps;
	topPanel: TopPanelProps;
	error: ErrorMessageProps;
	sendMessage: SendMessagePanelProps;
	time: TimeProps | undefined;
	addUserPopup: AddUserPopupProps;
	deleteUserPopup: DeleteUserPopupProps;
	createChatPopup: CreateChatPopupProps;
	currentChat: ChatProps | undefined;
	usersMenu: UsersMenuProps;
}
