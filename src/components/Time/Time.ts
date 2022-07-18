import { ParsedTimeProps, TimeProps } from './interfaces'
import { Block } from '../../shared/Block/Block'
import { ElementEvents } from '../../shared/global'
import { mapStateToProps } from '../../shared/store/mapStateToProps'
import { compile } from '../../shared/utils/compileTemplate'

import template from './Time.pug'
import { EventsTypes } from '../../shared/Block/types'
import { toDateString } from '../../shared/utils/toDateString'

export class Time extends Block<TimeProps> {
  constructor(props: TimeProps, event: string, events?: ElementEvents) {
    super('div', 'time', props, events)

    this.subscribe(event, mapStateToProps)
  }

  makePropsProxy(props: TimeProps): ParsedTimeProps {
    const newProps = {
      type: props.type,
      date: toDateString(props.date),
    }

    return new Proxy<ParsedTimeProps>(newProps, {
      get(target: ParsedTimeProps, prop: string): unknown {
        const value = target[prop]
        return typeof value === 'function' ? (value as () => void).bind(target) : value
      },
      set: (target: ParsedTimeProps, prop: string, value: string | Record<string, unknown>): boolean => {
        target[prop] = value instanceof Date ? toDateString(value) : value
        this.eventBus.emit(EventsTypes.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty(target: ParsedTimeProps, prop: string): boolean {
        delete target[prop]
        return true
      },
    })
  }

  render() {
    return compile(template, this.props, '', this.meta.events)
  }
}
