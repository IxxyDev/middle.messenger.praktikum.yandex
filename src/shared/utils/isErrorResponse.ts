import {Indexed} from '../global';
import {ErrorResponse} from '../../api/interfaces';

export const isErrorResponse = (res: Indexed): res is ErrorResponse => Boolean(res?.reason);
