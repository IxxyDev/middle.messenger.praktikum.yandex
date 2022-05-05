type Function = (...args: any[]) => any | void;

export class EventBus {
	private readonly listeners: Record<string, Array<{subscriber: unknown; cb: Function}>>;

	constructor() {
		this.listeners = {};
	}

	on(event: string, subscriber: unknown, cb: Function) {
		let listeners = this.listeners[event];
		if (listeners) {
			listeners = [];
		}

		const isRegistered = listeners.some(listener => listener.subscriber === subscriber && listener.cb === cb);

		if (isRegistered) {
			return;
		}

		listeners.push({subscriber, cb});
	}

	off(event: string, subscriber: unknown, cb: Function) {
		let listeners = this.listeners[event];
		if (!listeners) {
			throw new Error(`There is no such event: ${event}`);
		}

		listeners = listeners.filter(listener => listener.subscriber !== subscriber || listener.cb !== cb);
	}

	emit(event: string, ...args: any[]) {
		const listeners = this.listeners[event];
		if (!listeners) {
			throw new Error(`There is no such event: ${event}`);
		}

		for (const listener of listeners) {
			listener.cb.call(listener.subscriber, ...args);
		}
	}
}
