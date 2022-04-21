import {MessagesProps} from "./interfaces";
import {ElementEvents} from "../../shared/global";
import {Block} from "../../shared/Block/Block";
import {mapStateToProps} from "../../shared/store/mapStateToProps";
import {compile} from "../../shared/utils/compileTemplate";

import template from './Messages.pug';
import './Messages.scss';

const scrollToBottom = (): void => {
  const chatsContainer = document.querySelector('.chat') as HTMLDivElement

  if (!chatsContainer) return
  chatsContainer.scrollTop = chatsContainer.scrollHeight
}

export class Messages extends Block<MessagesProps> {
  constructor(props: MessagesProps, event: string, events?: ElementEvents) {
    super('div', 'message', props, events);

    this.subscribe(event, mapStateToProps)
  }

  componentDidMount() {
    setTimeout(scrollToBottom, 0);
  }

  render() {
    return compile(template, this.props, 'message', this.meta.events)
  }
}
