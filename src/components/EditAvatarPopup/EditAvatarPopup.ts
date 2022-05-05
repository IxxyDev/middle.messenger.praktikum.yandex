import {Block} from '../../shared/Block/Block';
import {ElementEvents} from '../../shared/global';
import {mapStateToProps} from '../../shared/store/mapStateToProps';
import {compile} from '../../shared/utils/compileTemplate';
import {EditAvatarPopupProps} from './interfaces';

import template from './EditAvatarPopup.pug'

export class EditAvatarPopup extends Block<EditAvatarPopupProps> {
	constructor(props: EditAvatarPopupProps, event: string, events?: ElementEvents) {
		super('div', '.popup_type_delete-user', props, events);

		this.subscribe(event, mapStateToProps);
	}

	render() {
		return compile(template, this.props, 'deleteUserPopup', this.meta.events);
	}
}
