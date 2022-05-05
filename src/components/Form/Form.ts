import {FormProps} from './interfaces';
import {ElementEvents} from '../../shared/global';
import {Block} from '../../shared/Block/Block';
import {compile} from '../../shared/utils/compileTemplate';

import template from './Form.pug';
import './Form.scss';

export class Form extends Block<FormProps> {
	constructor(props: FormProps, event: string, events: ElementEvents, rootId?: string) {
		super('div', 'form', props, events, rootId);
	}

	render() {
		return compile(template, this.props, '', this.meta.events);
	}
}
