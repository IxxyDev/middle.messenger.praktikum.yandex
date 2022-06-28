import { ElementEvents } from '../../shared/global'
import { Block } from '../../shared/Block/Block'
import { mapStateToProps } from '../../shared/store/mapStateToProps'
import { compile } from '../../shared/utils/compileTemplate'

import template from './Chat.pug'
import { ChatProps } from './interfaces'

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps, event: string, events?: ElementEvents) {
    super('div', 'message', props, events)

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(template, this.props, 'message', this.meta.events)
  }
}
