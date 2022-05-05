import { ElementEvents } from "../../shared/global";
import { UsersMenuProps } from "./interfaces";
import { Block } from "../../shared/Block/Block";
import { mapStateToProps } from "../../shared/store/mapStateToProps";
import { compile } from "../../shared/utils/compileTemplate";

import template from './UsersMenu.pug'

export class UsersMenu extends Block<UsersMenuProps> {
  constructor(props: UsersMenuProps, event: string, events?: ElementEvents) {
    super('div', 'usersMenu', props, events);

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(template, this.props, 'usersMenu', this.meta.events)
  }
}
