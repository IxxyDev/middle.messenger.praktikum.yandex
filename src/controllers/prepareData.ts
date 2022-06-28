import {Options, ResponseType} from '../services/http/http';

export const prepareData = (data: any): Options => ({
	headers: {
		'content-type': 'application/json',
	},
	responseType: ResponseType.JSON,
	withCredentials: true,
	data,
});
