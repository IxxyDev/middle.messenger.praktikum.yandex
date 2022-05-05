import {Props} from '../../shared/global';
import { ChatProps } from "../Chat/interfaces";

export interface ChatsProps extends Props {
	chats: ChatProps[] | [];
}
