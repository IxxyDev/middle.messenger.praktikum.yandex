import {Props} from '../../shared/global';
import {Input} from '../../components/Input/Input';
import {ChangeAvatarPopupProps} from '../../components/ChangeAvatarPopup/interfaces';

export interface SettingsPageProps extends Props {
	profileChange: Input[];
	passwordChange: Input[];
	changeAvatarPopup: ChangeAvatarPopupProps;
}
