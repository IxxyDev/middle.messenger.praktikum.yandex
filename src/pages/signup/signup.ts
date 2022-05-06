import { ElementEvents } from "../../shared/global";
import { compile } from "../../shared/utils/compileTemplate";
import { SIGNUP_EVENT } from "./events";
import { SignUpProps } from "./interfaces";
import { signUpEvents } from "./services";
import { Block } from "../../shared/Block/Block";

import template from './signup.pug'
import { signUpPageState } from "./state";

export class SignUp extends Block<SignUpProps> {
	constructor(propsObj: SignUpProps = signUpPageState, events: ElementEvents = signUpEvents, rootId?: string) {
		super('main', 'signUp', propsObj, events, rootId);
  }

	componentDidMount() {
		const root = document.getElementById(this.meta.rootId || 'root');
		root?.appendChild(this.getContent());
	}

	render() {
		return compile(template, this.props, SIGNUP_EVENT, this.meta.events);
	}

}
