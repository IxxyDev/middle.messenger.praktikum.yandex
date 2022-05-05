import {Block} from '../../shared/Block/Block';
import {ElementEvents} from '../../shared/global';
import {compile} from '../../shared/utils/compileTemplate';
import {ButtonProps} from './interfaces';

import templatePug from './Button.pug';
import './Button.scss';
import {mapStateToProps} from '../../shared/store/mapStateToProps';

export class Button extends Block<ButtonProps> {
	constructor(props: ButtonProps, event: string, events?: ElementEvents) {
		super('button', 'button', props, events);

		this.subscribe(event, mapStateToProps);
	}

	render() {
		return compile(templatePug, this.props, '', this.meta.events);
	}
}
