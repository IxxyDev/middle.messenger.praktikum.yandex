import { Block } from "../../shared/Block/Block";
import { ElementEvents } from "../../shared/global";
import { compile } from "../../shared/utils/compileTemplate";
import { router } from "../../routes";

import template from "./404.pug";
import "./404.scss";
import { Page404Props } from "./interfaces";
import { page404State } from "./state";

const page404Events: ElementEvents = {
  click: [
    {
      id: "toChats",
      fn(e) {
        e.preventDefault();
        router.go("/chats");
      }
    }
  ]
};

export class Page404 extends Block<Page404Props> {
  constructor(props: Page404Props = page404State, events: ElementEvents = page404Events, rootId?: string) {
    super("div", "error", props, events, rootId);
  }

  componentDidMount() {
    const root = document.getElementById(this.meta.rootId || "root");
    root?.appendChild(this.getContent());
  }

  render() {
    return compile(template, this.props, "", this.meta.events);
  }
}
