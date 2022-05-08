import { ChatPageProps } from "./interfaces";
import { Block } from "../../shared/Block/Block";
import { chatState } from "./state";
import { ElementEvents } from "../../shared/global";
import { chatEvents } from "./service";
import { CHAT_EVENT } from "./events";
import { mapStateToProps } from "../../shared/store/mapStateToProps";
import { GetChatsController } from "../../controllers/chat/getChats";
import { webSocketController } from "../../controllers/websocket/websocket";
import { compile } from "../../shared/utils/compileTemplate";

import template from './ChatPage.pug'
import './ChatPage.scss'

export class ChatPage extends Block<ChatPageProps> {
  constructor(props: ChatPageProps = chatState, events: ElementEvents = chatEvents, rootId?: string) {
    super('main', 'chatPage', props, events, rootId);

    this.subscribe(CHAT_EVENT, mapStateToProps)
    GetChatsController.getChats()
  }

  componentDidMount() {
    const root = document.getElementById(this.meta.rootId || 'root')
    root?.appendChild(this.getContent())
  }

  destroy() {
    if (webSocketController.isOpened) webSocketController.closeConnection()
    super.destroy()
  }

  render() {
    return compile(template, this.props, CHAT_EVENT, this.meta.events)
  }
}
