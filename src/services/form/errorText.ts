import {InputErrorType, InputName} from './interfaces';

const NAME_INPUT_VALUE_ERROR = 'Only Latin and Cyrillic alphabet are allowed, '
  + 'first letter should be uppercase';
const LOGIN_INPUT_VALUE_ERROR = 'Latin alphabet and numbers are allowed';
const LOGIN_INPUT_LENGTH_ERROR = 'Login should be from 2 to 15 characters';

const PASSWORD_INPUT_VALUE_ERROR = 'At least one capital letter and a number are required';
const PASSWORD_INPUT_LENGTH_ERROR = 'Password should be from 6 to 20 characters';

const EMAIL_INPUT_VALUE_ERROR = 'Invalid email';

const MESSAGE_INPUT_VALUE_ERROR = 'The message field cannot be empty';

export const INPUT_ERROR_TEXT: InputErrorType = {
	[InputName.firstName]: {
		text: NAME_INPUT_VALUE_ERROR,
		length: null,
	},
	[InputName.lastName]: {
		text: NAME_INPUT_VALUE_ERROR,
		length: null,
	},
	[InputName.login]: {
		text: LOGIN_INPUT_VALUE_ERROR,
		length: LOGIN_INPUT_LENGTH_ERROR,
	},
	[InputName.email]: {
		text: EMAIL_INPUT_VALUE_ERROR,
		length: null,
	},
	[InputName.password]: {
		text: PASSWORD_INPUT_VALUE_ERROR,
		length: PASSWORD_INPUT_LENGTH_ERROR,
	},
	[InputName.passwordAgain]: {
		text: PASSWORD_INPUT_VALUE_ERROR,
		length: PASSWORD_INPUT_LENGTH_ERROR,
	},
	[InputName.oldPassword]: {
		text: PASSWORD_INPUT_VALUE_ERROR,
		length: PASSWORD_INPUT_LENGTH_ERROR,
	},
	[InputName.newPassword]: {
		text: PASSWORD_INPUT_VALUE_ERROR,
		length: PASSWORD_INPUT_LENGTH_ERROR,
	},
	[InputName.phone]: {
		text: 'The value must be from 10 to 15 characters, '
      + 'consists of digits, can start with a plus',
		length: null,
	},
	[InputName.message]: {
		text: MESSAGE_INPUT_VALUE_ERROR,
		length: MESSAGE_INPUT_VALUE_ERROR,
	},
};
