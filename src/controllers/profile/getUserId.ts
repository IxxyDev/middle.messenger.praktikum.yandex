import {GetUserInfo} from '../../api/profile/profile-api';
import {ResponseType} from '../../services/http/http';
import {ErrorResponse, GetUserInfoResponse} from '../../api/interfaces';
import {IdAndAvatarModel} from '../interfaces';
import {isErrorResponse} from '../../shared/utils/isErrorResponse';

const getUserInfoApi = new GetUserInfo();

export class GetUserIdController {
	static async getUserId(): Promise<IdAndAvatarModel | void> {
		try {
			const res: GetUserInfoResponse | ErrorResponse
        = await getUserInfoApi.read({withCredentials: true, responseType: ResponseType.JSON});
			if (isErrorResponse(res)) {
				throw new Error(res.reason);
			}

			return {
				id: res.id,
				avatar: res.avatar,
			};
		} catch (e) {
			console.error(e);
		}
	}
}
