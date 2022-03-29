import {Block} from "../../shared/Block/Block"
import {ElementEvents} from "../../shared/global"
import templatePug from './404.pug'
import '404.scss'

const page404Events: ElementEvents = {
  click: [
    {
      id: 'goToChat',
      fn: e => {
        e.preventDefault()
        router.go('/chats')
      }
    }
  ]
}

export class Page404 extends Block<Page404Props> {
  constructor(props: Page404Props, events: ElementEvents = page404Events, rootId?: string) {
    super('div', 'error', props, events, rootId);
  }

  componentDidMount() {
    const root = document.getElementById(this.meta.rootId || 'root')

    root?.appendChild(this.getContent())
  }

  render() {
    return compileTemplate(templatePug, this.props, '', this.meta.events)
  }
}