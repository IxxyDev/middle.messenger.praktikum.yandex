import { Block } from "../../shared/Block/Block";
import { ElementEvents } from "../../shared/global";
import { mapStateToProps } from "../../shared/store/mapStateToProps";
import { compile } from "../../shared/utils/compileTemplate";

import template from './FoundChats.pug'
import { FoundChatsProps } from "./interfaces";

export class FoundChats extends Block<FoundChatsProps> {
  constructor(props: FoundChatsProps, event: string, events?: ElementEvents) {
    super('div', 'found-contacts')

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(template, this.props, 'foundChats', this.meta.events)
  }
}
