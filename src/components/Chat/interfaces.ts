import {Props} from '../../shared/global';
import {AvatarProps} from '../Avatar/interfaces';
import {TimeProps} from '../Time/interfaces';

export interface ChatProps extends Props {
	id: number;
	isActive: boolean;
	text: string;
	avatar: AvatarProps;
	time: TimeProps;
	contactName: string;
	newMessagesCount: number;
}
