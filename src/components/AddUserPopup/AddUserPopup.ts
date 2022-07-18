import { Block } from '../../shared/Block/Block';
import { ElementEvents } from '../../shared/global';
import { mapStateToProps } from '../../shared/store/mapStateToProps';
import { compile } from '../../shared/utils/compileTemplate';
import { AddUserPopupProps } from './interfaces';

import template from './AddUserPopup.pug';
import './AddUserPopup.scss';

export class AddUserPopup extends Block<AddUserPopupProps> {
  constructor(props: AddUserPopupProps, event: string, events?: ElementEvents) {
    super('div', 'popup_type_add-user', props, events);

    this.subscribe(event, mapStateToProps);
  }

  render() {
    return compile(template, this.props, 'addUserPopup', this.meta.events);
  }
}
