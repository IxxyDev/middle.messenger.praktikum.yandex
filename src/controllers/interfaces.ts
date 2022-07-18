export type SignInModel = {
	login: string;
	password: string;
};

export type SignUpModel = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	phone: string;
	password: string;
};

export type AddUsersModel = {
	users: number[];
	chatId: number;
};

export type DeleteUsersModel = {
	users: number[];
	chatId: number;
};

export type PasswordModel = {
	oldPassword: string;
	newPassword: string;
};

export type IdAndAvatarModel = {
	id: number;
	avatar: string;
};
