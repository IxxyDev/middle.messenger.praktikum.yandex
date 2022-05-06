export enum InputName {
	firstName = 'first_name',
	lastName = 'second_name',
	login = 'login',
	email = 'email',
	password = 'password',
	repeatPassword = 'repeatPassword',
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
