import {EventBus} from '../EventBus';
import {State} from '../global';
import {initialState} from './initialState';
import { set } from "../utils/set";

class Store extends EventBus {
	private readonly state: State = initialState;

	public getState(): State {
		return this.state;
	}

	public setState(path: string, value: unknown, eventName: string): void {
		set(this.state, path, value);

		this.emit(eventName, path);
	}
}

export default new Store();
