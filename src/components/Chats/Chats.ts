import { ElementEvents } from '../../shared/global'
import { Block } from '../../shared/Block/Block'
import { mapStateToProps } from '../../shared/store/mapStateToProps'
import { compile } from '../../shared/utils/compileTemplate'

import template from './Chats.pug'
import { ChatsProps } from './interfaces'

const scrollToBottom = (): void => {
  const chatsContainer = document.querySelector('.chat')!

  if (!chatsContainer) {
    return
  }

  chatsContainer.scrollTop = chatsContainer.scrollHeight
}

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps, event: string, events?: ElementEvents) {
    super('div', 'chatsList', props, events)

    this.subscribe(event, mapStateToProps)
  }

  componentDidMount() {
    setTimeout(scrollToBottom, 0)
  }

  render() {
    return compile(template, this.props, 'chatsList', this.meta.events)
  }
}
