import {Indexed} from '../global';
import {isObject} from './isObject';
import {getParams} from './getParams';

export const queryToString = (data: Indexed): string => {
	if (!isObject(data)) {
		throw new Error('Not an object');
	}

	return '?' + getParams(data).map(param => param.join('=')).join('&')
};
