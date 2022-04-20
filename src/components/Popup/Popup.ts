import {PopupProps} from "./interfaces";
import {Block} from "../../shared/Block/Block";
import {ElementEvents} from "../../shared/global";
import {mapStateToProps} from "../../shared/store/mapStateToProps";
import {compile} from "../../shared/utils/compileTemplate";

import template from './Popup.pug';
import './Popup.scss';

export class Popup extends Block<PopupProps> {
  constructor(props: PopupProps, event: string, events?: ElementEvents) {
    super('div', 'popup', props, events)

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(template, this.props, 'popup', this.meta.events)
  }
}
