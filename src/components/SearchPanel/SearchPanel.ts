import { Block } from '../../shared/Block/Block'
import { mapStateToProps } from '../../shared/store/mapStateToProps'
import { ElementEvents } from '../../shared/global'
import { compile } from '../../shared/utils/compileTemplate'

import template from './SearchPanel.pug'
import './SearchPanel.scss'
import { SearchPanelProps } from './interfaces'

export class SearchPanel extends Block<SearchPanelProps> {
  constructor(props: SearchPanelProps, event: string, events?: ElementEvents) {
    super('div', 'search-panel', props, events)

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(template, this.props, '', this.meta.events)
  }
}
