import {ElementEvents} from '../../shared/global';
import {Block} from '../../shared/Block/Block';
import {mapStateToProps} from '../../shared/store/mapStateToProps';
import {compile} from '../../shared/utils/compileTemplate';
import {SettingsPageProps} from './interfaces';
import {GetUserInfoController} from '../../controllers/profile/getUserInfo';
import {settingsState} from './state';

import template from './settings.pug';
import {SETTINGS_EVENT, UPDATE_USER_EVENT} from './events';

export class SettingsPage extends Block<SettingsPageProps> {
	constructor(props: SettingsPageProps = settingsState, events: ElementEvents, rootId?: string) {
		super('main', 'settingsPage', props, events, rootId);

		this.subscribe(SETTINGS_EVENT, mapStateToProps);
		this.subscribe(UPDATE_USER_EVENT, mapStateToProps);
		GetUserInfoController.getInfo();
	}

	componentDidMount() {
		const root = document.getElementById(this.meta.rootId || 'root');
		root?.appendChild(this.getContent());
	}

	render() {
		return compile(template, this.props, SETTINGS_EVENT, this.meta.events);
	}
}
