import { v4 as uuidv4 } from 'uuid';
import EventBus from "../../utils/eventBus";
import DOMParser from "../../utils/DOMParser";

enum EVENTS {
	INIT = "init",
	FLOW_CDM = "flow:component-did-mount",
	FLOW_CDU = "flow:component-did-update",
	FLOW_RENDER = "flow: render",
}

export type Props = Record<string, any>

export type Meta = {
	tagName: string,
	props: Props,
	withInternalId?: boolean,
}

export default abstract class Block<T extends Props> {
	private readonly id: string;
	private eventBus: () => EventBus
	public element: HTMLElement
	private content: HTMLDivElement

	props: Props
	meta: Meta

	protected constructor(tagName: string = 'div', propsAndChildren: Props = {}) {
		const { children, props } = this.getChildren(propsAndChildren)
		this.meta = { tagName, props }

		this.id = uuidv4()
		const propsWithId: Record<any, any> = Object.assign(props, {id: this.id});
		const eventBus = new EventBus()
		this.props = this.makePropsProxy(propsWithId)
		this.eventBus = () => eventBus
		this.registerEvents(eventBus)
		eventBus.emit(EVENTS.INIT)
	}

	private makePropsProxy(props: T) {
		return new Proxy(props, {
			get: (target, prop: string): boolean => {
				const value = target[prop]
				return typeof value === 'function' ? value.bind(target) : value
			},
			set: (target, prop: string, value): boolean => {
				this.eventBus().emit(
					EVENTS.FLOW_CDU,
					{...target},
					{...target, [prop]: value}
				)
				return true;
			},
			deleteProperty: () => {
				throw new Error("Failed request")
			}
		})
	}

	private getChildren(propsAndChildren: Props) {
		const props: Record<string, Block<Props>> = {}
		const children: Record<string, Block<Props>> = {}

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		})

		return { children, props };
	}

	private registerEvents(eventBus: EventBus) {
		eventBus.on({ event: EVENTS.INIT, callback: this.init.bind(this)})
		eventBus.on({ event: EVENTS.FLOW_CDM, callback: this.componentDidMount.bind(this)})
		eventBus.on({ event: EVENTS.FLOW_CDU, callback: this.componentDidUpdate.bind(this)})
		eventBus.on({ event: EVENTS.FLOW_RENDER, callback: this.render.bind(this)})
	}

	private createResources() {
		this.content = document.createElement('div')

		if(this.meta.props?.classNames) {
			for (const cn of this.meta.props.classNames) {
				this.content.classList.add(cn);
			}
		}
	}

	private init() {
		this.createResources()
		this.eventBus().emit(EVENTS.FLOW_CDM)

	}

	private componentDidMount() {
		this.eventBus().emit(EVENTS.FLOW_RENDER)
	}

	private componentDidUpdate(prevProps: T, newProps: T) {
		if (prevProps !== newProps) {
			this.eventBus().emit(EVENTS.FLOW_RENDER)
		}
	}

	abstract renderBlock(): string | HTMLElement

	private render() {
		const block = this.renderBlock();

		if (typeof block === 'string') {
			const element = DOMParser(block);
			if (this.meta.withInternalId) {
				element.setAttribute("data-id", this.id)
			}
			this.removeEvents()
			this.element = element
			this.addEvents()
		} else {
			this.removeEvents()
			this.element = block
			this.addEvents()
		}

		this.content.innerHTML = ''
		this.content.appendChild(this.element)
	}

	private addEvents(): void {
		if (this.element) {
			const {events = {}} = this.props

			const keys = Object.keys(events)
			for (const key of keys) {
				this.element.addEventListener(key, events[key])
			}
		}
	}

	private removeEvents(): void {
		if (this.element) {
			const {events = {}} = this.props

			const keys = Object.keys(events)
			for (const key of keys) {
				this.element.removeEventListener(key, events[key])
			}
		}
	}

	getElement() {
		return this.element
	}

	getContent() {
		return this.content
	}

	show(): void {
		this.getContent().style.display = 'block'
	}

	hide(): void {
		this.getContent().style.display = 'none'
	}
}
