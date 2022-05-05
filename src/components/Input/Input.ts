import {Block} from '../../shared/Block/Block';
import {ElementEvents} from '../../shared/global';
import {compile} from '../../shared/utils/compileTemplate';
import {InputProps} from './interfaces';

import templatePug from './Input.pug';
import './Input.scss';
import {mapStateToProps} from '../../shared/store/mapStateToProps';

export class Input extends Block<InputProps> {
	constructor(props: InputProps, event: string, events?: ElementEvents) {
		super('input', 'input', props, events);

		this.subscribe(event, mapStateToProps);
	}

	render() {
		return compile(templatePug, this.props, '', this.meta.events);
	}
}
