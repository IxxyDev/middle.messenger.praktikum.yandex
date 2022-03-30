import {Block} from "../../shared/Block/Block";
import {ElementEvents} from "../../shared/global";
import {compile} from "../../shared/utils/compileTemplate";
import {AvatarProps} from "./interfaces"

import templatePug from './Avatar.pug'
import './Avatar.scss'
import { mapStateToProps } from "../../shared/store/mapStateToProps";

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps, event: string, events?: ElementEvents) {
    super('div', 'avatar', props, events);

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(templatePug, this.props, '', this.meta.events)
  }
}