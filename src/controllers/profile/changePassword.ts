import {ChangePassword} from '../../api/profile/profile-api';
import {PasswordModel} from '../interfaces';
import {prepareData} from '../prepareData';
import {ErrorResponse} from '../../api/interfaces';

const changePasswordApi = new ChangePassword();

export class ChangePasswordController {
	static async changePassword(data: PasswordModel): Promise<void> {
		try {
			const res: ErrorResponse | undefined = await changePasswordApi.update(prepareData(data));
			if (res) {
				throw new Error(res.reason);
			}
		} catch (e) {
			console.error(e);
		}
	}
}
