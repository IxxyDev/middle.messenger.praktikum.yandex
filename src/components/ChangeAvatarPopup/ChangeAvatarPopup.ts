import { Block } from '../../shared/Block/Block';
import { ElementEvents } from '../../shared/global';
import { mapStateToProps } from '../../shared/store/mapStateToProps';
import { compile } from '../../shared/utils/compileTemplate';

import template from './ChangeAvatarPopup.pug';
import { ChangeAvatarPopupProps } from './interfaces';

export class ChangeAvatarPopup extends Block<ChangeAvatarPopupProps> {
  constructor(props: ChangeAvatarPopupProps, event: string, events?: ElementEvents) {
    super('div', 'popup_type_change-avatar', props, events);

    this.subscribe(event, mapStateToProps);
  }

  render() {
    return compile(template, this.props, 'changeAvatarPopup', this.meta.events);
  }
}
