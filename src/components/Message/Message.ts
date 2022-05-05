import {MessageProps} from './interfaces';
import {ElementEvents} from '../../shared/global';
import {Block} from '../../shared/Block/Block';
import {mapStateToProps} from '../../shared/store/mapStateToProps';
import {compile} from '../../shared/utils/compileTemplate';

import template from './Message.pug';
import './Message.scss';

export class Message extends Block<MessageProps> {
	constructor(props: MessageProps, event: string, events?: ElementEvents) {
		super('div', 'message', props, events);

		this.subscribe(event, mapStateToProps);
	}

	render() {
		return compile(template, this.props, 'message', this.meta.events);
	}
}
