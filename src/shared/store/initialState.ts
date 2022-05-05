import {page404State} from '../../pages/404/state';
import {page500State} from '../../pages/500/state';
import { chatState } from "../../pages/chat/state";

export const initialState = {
	page404: page404State,
	page500: page500State,
	chatPage: chatState,
	settingsPage: settingsState,
};
