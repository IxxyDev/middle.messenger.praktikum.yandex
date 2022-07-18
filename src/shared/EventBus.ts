export class EventBus {
  private readonly listeners: Record<string, Array<{ subscriber: unknown; cb: Function }>>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, subscriber: unknown, cb: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    const isRegistered =
      this.listeners[event].some(listener => listener.subscriber === subscriber && listener.cb === cb);

    if (isRegistered) return;

    this.listeners[event].push({ subscriber, cb });
  }

  off(event: string, subscriber: unknown, cb: Function) {
    if (!this.listeners[event]) throw new Error(`There is no such event: ${event}`);

    this.listeners[event] =
      this.listeners[event].filter(listener => listener.subscriber !== subscriber || listener.cb !== cb);
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`There is no such event: ${event}`);
    }

    for (const listener of this.listeners[event]) {
      listener.cb.call(listener.subscriber, ...args);
    }
  }
}

export default new EventBus();
