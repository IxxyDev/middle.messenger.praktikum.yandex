import { Block } from "../../shared/Block/Block";
import { compile } from "../../shared/utils/compileTemplate";
import { ElementEvents } from "../../shared/global";

import template from "./signin.pug";
import "./signin.scss";
import { SIGNIN_EVENT } from "./events";
import { SignInProps } from "./interfaces";
import { signInEvents } from "./services";
import { signInPageState } from "./state";

export class SignIn extends Block<SignInProps> {
  constructor(propsObj: SignInProps = signInPageState, events: ElementEvents = signInEvents, rootId?: string) {
    super("main", "signIn", propsObj, events, rootId);
  }

  componentDidMount() {
    const root = document.getElementById(this.meta.rootId || "root");
    root?.appendChild(this.getContent());
  }

  render() {
    console.log("SIGN IN COMPILE");
    return compile(template, this.props, SIGNIN_EVENT, this.meta.events);
  }
}
