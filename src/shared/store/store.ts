import {EventBus} from '../EventBus'
import {State} from "../global";
import {INITIAL_STATE} from "./initialState/initialState";

class Store extends EventBus {
  private state: State = INITIAL_STATE;

  public getState(): State {
    return this.state;
  }

  public setState(path: string, value: unknown, eventName: string): void {
    set(this.state, path, value);

    this.emit(eventName, path);
  };
}

export default new Store();
