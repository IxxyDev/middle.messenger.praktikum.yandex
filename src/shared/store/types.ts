import {Page404Props} from '../../pages/404/interfaces';
import {Page500Props} from '../../pages/500/interfaces';
import {ChatProps} from '../screens/chat/types';
import {SignInProps} from '../screens/signin/types';
import {SignUpProps} from '../screens/signup/types';
import {SettingsProps} from '../screens/settings/types';

export type State = {
	page404: Page404Props;
	page500: Page500Props;
	chat: ChatProps;
	signIn: SignInProps;
	signUp: SignUpProps;
	settings: SettingsProps;
};
