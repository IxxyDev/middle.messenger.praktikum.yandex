import { v4 as uuidv4 } from 'uuid';
import EventBus from "../../utils/eventBus";
import DOMParser from "../../utils/DOMParser";

enum EVENTS {
	INIT = "init",
	FLOW_CDM = "flow:component-did-mount",
	FLOW_CDU = "flow:component-did-update",
	FLOW_RENDER = "flow: render",
}

export type Props = {
	classNames?: string[],
	events?: { [key: string]: (e: Event, ...args: any[]) => void},
	[key: string]: unknown
}

export type Settings = {
	withInternalId?: boolean;
}

export type Meta = {
	props: Props,
	withInternalId?: boolean,
}

export default abstract class Block {
	private readonly id: string;
	private eventBus: () => EventBus
	private element: HTMLElement
	private content: HTMLDivElement

	props: Props
	meta: Meta

	protected constructor(props: Props = {}, settings: Settings = {}) {
		this.meta = {
			props,
			withInternalId: settings.withInternalId
		}

		const eventBus = new EventBus()
		if (this.meta.withInternalId) {
			this.id = uuidv4()
		}
		this.props = this.makePropsProxy({ ...props })
		this.eventBus = () => eventBus
		this.registerEvents(eventBus)
		eventBus.emit(EVENTS.INIT)
	}

	private makePropsProxy(props: Props) {
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

	private componentDidUpdate(prevProps: Props, newProps: Props) {
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
