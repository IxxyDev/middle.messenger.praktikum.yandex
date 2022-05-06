import {Block} from '../../shared/Block/Block';
import {ElementEvents} from '../../shared/global';
import {compile} from '../../shared/utils/compileTemplate';
import {router} from '../../routes';
import { page500State } from "./state";

import templatePug from './500.pug';
import './500.scss';
import {Page500Props} from './interfaces';

const page500Events: ElementEvents = {
	click: [
		{
			id: 'toChats',
			fn: e => {
				e.preventDefault();
				router.go('/chats');
			},
		},
	],
};

export class Page500 extends Block<Page500Props> {
	constructor(props: Page500Props = page500State, events: ElementEvents = page500Events, rootId?: string) {
		super('main', 'error', props, events, rootId);
	}

	componentDidMount() {
		const root = document.getElementById(this.meta.rootId || 'root');

		root?.appendChild(this.getContent());
	}

	render() {
		return compile(templatePug, this.props, '', this.meta.events);
	}
}
