import {Block} from '../../shared/Block/Block';
import {ElementEvents} from '../../shared/global';
import {mapStateToProps} from '../../shared/store/mapStateToProps';
import {compile} from '../../shared/utils/compileTemplate';
import {CreateChatPopupProps} from './interfaces';

import template from './CreateChatPopup.pug'
import './CreateChatPopup.scss'

export class CreateChatPopup extends Block<CreateChatPopupProps> {
  constructor(props: CreateChatPopupProps, event: string, events?: ElementEvents) {
    super('div', '.popup_type_create-chat', props, events);

    this.subscribe(event, mapStateToProps);
  }

  render() {
    return compile(template, this.props, 'createChatPopup', this.meta.events);
  }
}
