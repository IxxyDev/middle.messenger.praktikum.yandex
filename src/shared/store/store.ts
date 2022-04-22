import {EventBus} from '../EventBus'
import {State} from "../global";
import {initialState} from "./initialState";

class Store extends EventBus {
  private state: State = initialState;

  public getState(): State {
    return this.state;
  }

  public setState(path: string, value: unknown, eventName: string): void {
    set(this.state, path, value);

    this.emit(eventName, path);
  };
}

export default new Store();
