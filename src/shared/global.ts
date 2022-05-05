import {Page404Props} from '../pages/404/interfaces';
import {Page500Props} from '../pages/500/interfaces';
import { ChatPageProps } from "../pages/chat/interfaces";
import { SettingsPageProps } from "../pages/settings/interfaces";
import { Block } from "./Block/Block";

export type ElementEvent = {
	id: string
	fn: (event: Event) => void
}

export type Indexed<T = unknown> = {
	[key in string]: T
}

export type Props = Indexed
export type ElementEvents = Record<string, ElementEvent[]>

export type ComponentState = {
	string: InstanceType<typeof Block>
}
export const componentsState = {} as ComponentState

export type State = {
	page404: Page404Props
	page500: Page500Props
	chatPage: ChatPageProps,
	settingsPage: SettingsPageProps
};

