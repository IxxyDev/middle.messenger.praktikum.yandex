import {GetUserInfo} from '../../api/profile/profile-api';
import {ResponseType} from '../../services/http/http';
import {ErrorResponse, GetUserInfoResponse} from '../../api/interfaces';
import store from '../../shared/store/store';
import {SettingsPageProps} from '../../pages/settings/interfaces';
import {formImgSrc} from '../../shared/utils/formImgSrc';
import {isErrorResponse} from '../../shared/utils/isErrorResponse';
import {UPDATE_USER_EVENT} from '../../pages/settings/events';

const getUserInfoApi = new GetUserInfo();
const mapDataToStore = (data: GetUserInfoResponse): SettingsPageProps => {
	const state = store.getState();
	const {settingsPage} = state;

	return {
		...settingsPage,
		imgSrc: formImgSrc(data.avatar),
		firstName: {
			...settingsPage,
			value: data.first_name,
		},
		surName: {
			...settingsPage,
			value: data.second_name,
		},
		userName: {
			...settingsPage,
			value: data.display_name,
		},
		login: {
			...settingsPage,
			value: data.login,
		},
		email: {
			...settingsPage,
			value: data.email,
		},
		phone: {
			...settingsPage,
			value: data.phone,
		},
		avatar: {
			...settingsPage,
			value: data.avatar,
		},
	};
};

export class GetUserInfoController {
	static async getInfo(): Promise<void> {
		try {
			const res: GetUserInfoResponse | ErrorResponse
        = await getUserInfoApi.read({withCredentials: true, responseType: ResponseType.JSON});
			if (isErrorResponse(res)) {
				throw new Error(res.reason);
			}

			store.setState('settingsPage', mapDataToStore(res), UPDATE_USER_EVENT);
		} catch (e) {
			console.error(e);
		}
	}
}
