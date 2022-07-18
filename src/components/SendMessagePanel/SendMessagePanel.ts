import { Block } from '../../shared/Block/Block'
import { mapStateToProps } from '../../shared/store/mapStateToProps'
import { ElementEvents } from '../../shared/global'
import { compile } from '../../shared/utils/compileTemplate'

import template from './SendMessagePanel.pug'
import './SendMessagePanel.scss'
import { SendMessagePanelProps } from './interfaces'

export class SendMessagePanel extends Block<SendMessagePanelProps> {
  constructor(props: SendMessagePanelProps, event: string, events?: ElementEvents) {
    super('div', 'send-message', props, events)

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(template, this.props, '', this.meta.events)
  }
}
