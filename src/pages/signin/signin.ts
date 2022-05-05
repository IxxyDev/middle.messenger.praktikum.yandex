import { Block } from "../../shared/Block/Block";
import { compile } from "../../shared/utils/compileTemplate";

import template from './signin.pug'
import { ElementEvents } from "../../shared/global";
import { SIGNIN_EVENT } from "./events";
import { SignInProps } from "./interfaces";
import { signInEvents } from "./services";
import { signInPageState } from "./state";

export class SignIn extends Block<SignInProps> {
	constructor(propsObj: SignInProps = signInPageState, events: ElementEvents = signInEvents, rootId?: string) {
		super('main', 'signIn', propsObj, events, rootId);
	}

	componentDidMount() {
		const root = document.getElementById(this.meta.rootId || 'root');
		root?.appendChild(this.getContent());
	}

	render() {
		return compile(template, this.props, SIGNIN_EVENT, this.meta.events);
	}

}
