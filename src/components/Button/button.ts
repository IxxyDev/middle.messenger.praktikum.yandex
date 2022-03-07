import Block, {Props} from "../Block"
import {compile} from '../../utils/compile'
import template from './template.pug'
import {addClass} from '../../utils/addClass'

export class Button extends Block<Props> {
  constructor(props: {}) {
    super('button', props);
  }

  render() {
    addClass(this.element, this.props);
    if (this.props.avatar) {
      this.element.setAttribute('style', `background-image: url(${this.props.avatar})`)
    }

    return compile(template, {...this.props})
  }
}