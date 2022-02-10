type EventCallback = (...args: any[]) => void;

interface EventArgs {
	event: string;
	callback: EventCallback;
}

interface EventEmitter {
	on(evt: EventArgs): void,
	off(evt: EventArgs): void,
	emit(evt: EventArgs, ...args: any[]): void
}

export default class EventBus implements EventEmitter {
	listeners: { [key: string]: EventCallback[] }

	constructor() {
		this.listeners = {}
	}

	on(evt: EventArgs) {
		const { event, callback } = evt;
		if (!this.listeners[event]) {
			this.listeners[event] = []
		}

		this.listeners[event].push(callback)
	}

	off(evt: EventArgs) {
		const { event, callback } = evt;
		if (!this.listeners[event]) {
			throw new Error(`No event: ${event}`)
		}

		this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
	}

	emit(evt: EventArgs, ...args: any[]) {
		if (!this.listeners[evt.event]) {
			throw new Error(`No event: ${evt.event}`)
		}

		this.listeners[evt.event].forEach(listener => listener(...args))
	}
}
