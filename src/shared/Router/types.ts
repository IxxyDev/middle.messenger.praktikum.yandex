import {ElementEvents, Props} from '../global';
import {Block} from '../Block/Block';

export type RouteProps = {
	query: string;
};

export type BlockHeir = new (
	props: Props | undefined,
	events: ElementEvents | undefined,
	rootId?: string) => InstanceType<typeof Block>;
