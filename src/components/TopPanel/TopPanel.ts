import {Block} from "../../shared/Block/Block";
import {mapStateToProps} from "../../shared/store/mapStateToProps";
import {ElementEvents} from "../../shared/global";
import {compile} from "../../shared/utils/compileTemplate";

import template from './SearchPanel.pug';
import './SearchPanel.scss';
import {TopPanelProps} from "./interfaces";

export class TopPanel extends Block<TopPanelProps> {
  constructor(props: TopPanelProps, event: string, events?: ElementEvents) {
    super('div', 'send-message', props, events);

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(template, this.props, '', this.meta.events)
  }
}
