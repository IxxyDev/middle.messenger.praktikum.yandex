import { ElementEvents } from "../../shared/global";
import { Block } from "../../shared/Block/Block";
import { mapStateToProps } from "../../shared/store/mapStateToProps";
import { compile } from "../../shared/utils/compileTemplate";

import template from './ErrorMessage.pug'
import { ErrorMessageProps } from "./interfaces";

export class ErrorMessage extends Block<ErrorMessageProps> {
  constructor(props: ErrorMessageProps, event: string, events?: ElementEvents) {
    super('div', 'errorMessage', props, events);

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(template, this.props, '', this.meta.events)
  }
}
