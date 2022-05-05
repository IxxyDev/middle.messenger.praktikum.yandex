import {Props} from '../../shared/global';
import {TimeProps} from '../Time/interfaces';

export interface MessageProps extends Props {
	isMe: boolean;
	text: string;
	time: TimeProps;
}
