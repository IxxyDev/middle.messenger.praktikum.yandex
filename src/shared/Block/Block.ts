import {EventBus} from '../EventBus'
import {ElementEvents, Props, ElementEvent} from "../global";
import {EventsTypes, Meta, StoreEvent} from './types';
import store from '../store/store'

export class Block<T> {
  props: Props;
  protected readonly meta: Meta;
  private element: HTMLElement | undefined;
  private storeEvents: StoreEvent[] | undefined;
  protected eventBus: EventBus;

  constructor(tagName = 'div', containerClassName: string, props = {}, events: ElementEvents = {}, rootId?: string) {
    this.eventBus = new EventBus()
    this.meta = {
      tagName,
      containerClassName,
      props,
      events,
      rootId
    }

    this.props = this.makePropsProxy(props)
    this.registerEventBusEvents(this.eventBus)
    this.eventBus.emit(EventsTypes.FLOW_CDM)
  }

  init() {
    this.createResources()
    this.addAttributes()
    this.eventBus.emit(EventsTypes.INIT)
  }

  componentDidMount(): void {

  }

  componentDidUpdate(prevProps: Props, newProps: Props): boolean {
    return isDeepEqual(prevProps, newProps)
  }

  setProps<T>(newProps: Props): void {
    if (!newProps) return

    Object.assign(this.props, newProps)
  }

  render(): DocumentFragment {
    console.log('Render is not here yet!')
  }

  subscribe(event: string, cb: (path: string) => void): void {
    store.on(event, this, cb)
    this.storeEvents?.push({event, cb})
  }

  getContent(): HTMLElement {
    return this.element
  }

  show() {
    this.getContent().classList.remove('hidden')
  }

  hide() {
    this.getContent().classList.add('hidden')
  }

  destroy() {
    this.componentWillUnmount()
  }

  get _element(): HTMLElement {
    return this.element
  }

  private registerEventBusEvents(eventBus: EventBus) {
    eventBus.on(EventsTypes.INIT, this, this.init)
    eventBus.on(EventsTypes.FLOW_CDM, this, this.componentDidMount)
    eventBus.on(EventsTypes.FLOW_CDU, this, this.componentDidUpdate)
    eventBus.on(EventsTypes.FLOW_RENDER, this, this.render)
  }

  private removeEventBusEvents() {
    this.eventBus.off(EventsTypes.INIT, this, this.init);
    this.eventBus.off(EventsTypes.FLOW_CDM, this, this.componentDidMount);
    this.eventBus.off(EventsTypes.FLOW_CDU, this, this.componentDidUpdate);
    this.eventBus.off(EventsTypes.FLOW_RENDER, this, this.render);
  }

  private createResources() {
    this.element = this.createDocumentElement(this.meta.tagName)
  }

  private addAttributes() {
    this.element?.setAttribute('component', this.constructor.name)

    this.meta.containerClassName && this.element?.classList.add(this.meta.containerClassName)
  }

  private _componentDidMount() {
    this.componentDidMount()
    this.eventBus.emit(EventsTypes.FLOW_RENDER)
  }

  private componentWillUnmount() {
    this.removeAllEvents()
    const root = document.getElementById(this.meta.rootId || '')

    if (root) {
      root.innerHTML = ''
    }
  }

  private _componentDidUpdate(prevProps: Props, newProps: Props) {
    const isEqual = this.componentDidUpdate(prevProps, newProps);

    if (!isEqual) {
      this.eventBus.emit(EventsTypes.FLOW_RENDER);
    }
  }

  private _render() {
    this.removeEvents();
    this.element.innerHTML = '';
    this.element?.appendChild(this.render());
    this.addEvents();
  }

  private createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName)
  }

  private addEvents() {
    Object.entries(this.meta.events).forEach(([eventName, eventArray = []]) => {
      eventArray.forEach((event: ElementEvent)=> {
        const nodeElement = this.element?.querySelector(`#${event.id}`)
        if (!nodeElement) return

        nodeElement.addEventListener(eventName, event.fn)
      })
    })
  }

  private removeEvents() {
    Object.entries(this.meta.events).forEach(([eventName, eventArray = []]) => {
      eventArray.forEach((event: ElementEvent) => {
        const nodeElement = this.element?.querySelector(`#${event.id}`)
        nodeElement && nodeElement.addEventListener(eventName, event.fn)
      })
    })
  }

  private removeStoreEvents() {
    this.storeEvents?.forEach(({event, cb}) => {
      store.off(event, this, cb);
    });
  }

  private removeAllEvents() {
    this.removeEventBusEvents();
    this.removeEvents();
    this.removeStoreEvents();
  }

  private makePropsProxy(props: Props): Props {
    const propsFromCustomMethod = this.makePropsProxy(props)

    if (propsFromCustomMethod) return propsFromCustomMethod

    return new Proxy<Props>(props, {
      get: (target: Props, prop: string): unknown => {
        const value = target[prop] as unknown

        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (
        target: Props,
        prop: string,
        value: string | Record<string, unknown>
      ): boolean => {
        const targetCopy = cloneDeep(target)
        target[prop] = value

        this.eventBus.emit(EventsTypes.FLOW_CDU, targetCopy, target)

        return true
      },
      deleteProperty(target: Props, prop: string): boolean {
        delete target[prop]
        return true
      }
    })
  }

}