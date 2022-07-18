import {Props, ElementEvents} from '../global';

export type Meta = {
	tagName: string;
	containerClassName: string;
	props: Props;
	events: ElementEvents;
	rootId?: string;
};

export enum EventsTypes {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_RENDER = 'flow:render',
}

export type StoreEvent = {
	event: string;
	cb: (path: string) => void;
};
