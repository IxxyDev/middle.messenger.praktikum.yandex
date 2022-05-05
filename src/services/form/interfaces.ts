export enum InputName {
	firstName = 'firstName',
	lastName = 'lastName',
	login = 'login',
	email = 'email',
	password = 'password',
	passwordAgain = 'passwordAgain',
	oldPassword = 'oldPassword',
	newPassword = 'newPassword',
	phone = 'phone',
	message = 'message',
}

export type Invalid = {
	text?: true;
	length?: true;
} | null;

export type ValidItem = ({
	fieldName: InputName;
	dataName: string;
	invalid: Invalid;
} | null);

export interface FormValidation {
	validateInput: (element: HTMLInputElement) => Invalid;
	hasValidation: (fieldName: string) => boolean;
}

export type InputErrorType = Record<string, {
	text: string | null;
	length: string | null;
}>;
