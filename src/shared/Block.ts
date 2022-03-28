export class Block<T> {
  props: Props;
  protected readonly meta: Meta;
  private element: HTMLElement;
  private events: EventType[];

  constructor(tagName = 'div', props = {}) {

  }
}