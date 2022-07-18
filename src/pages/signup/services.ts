import {HandleError} from '../../services/error';
import {ElementEvents} from '../../shared/global';
import {router} from '../../routes';
import {formEventName} from '../../shared/utils/formEventName';
import {SIGNUP_EVENT} from './events';
import {SignUpController} from '../../controllers/auth/signup';
import {InputName} from '../../services/form/interfaces';

class Services extends HandleError {
	public signUpEvents: ElementEvents = {
		click: [
			{
				id: 'toSignIn',
				fn(e) {
					e.preventDefault();
					router.go('/');
				},
			},
		],
		focus: [
			{
				id: 'first_name',
				fn: e => {
					this.HandleForm.handleFocus(e);
				},
			},
			{
				id: 'second_name',
				fn: e => {
					this.HandleForm.handleFocus(e);
				},
			},
			{
				id: 'login',
				fn: e => {
					this.HandleForm.handleFocus(e);
				},
			},
			{
				id: 'email',
				fn: e => {
					this.HandleForm.handleFocus(e);
				},
			},
			{
				id: 'phone',
				fn: e => {
					this.HandleForm.handleFocus(e);
				},
			},
			{
				id: 'password',
				fn: e => {
					this.HandleForm.handleFocus(e);
				},
			},
			{
				id: 'repeatPassword',
				fn: e => {
					this.HandleForm.handleFocus(e);
				},
			},
		],
		blur: [
			{
				id: 'first_name',
				fn: e => {
					const error = this.HandleForm.handleBlur(e);

					if (!error) {
						this.hideError('signUp.errorName', formEventName(SIGNUP_EVENT, 'errorName'));
					} else {
						this.showError('signUp.errorName', formEventName(SIGNUP_EVENT, 'errorName'), error, InputName.firstName);
					}
				},
			},
			{
				id: 'second_name',
				fn: e => {
					const error = this.HandleForm.handleBlur(e);

					if (!error) {
						this.hideError('signUp.errorSurname', formEventName(SIGNUP_EVENT, 'errorSurname'));
					} else {
						this.showError('signUp.errorSurname', formEventName(SIGNUP_EVENT, 'errorSurname'), error, InputName.lastName);
					}
				},
			},
			{
				id: 'login',
				fn: e => {
					const error = this.HandleForm.handleBlur(e);

					if (!error) {
						this.hideError('signUp.errorLogin', formEventName(SIGNUP_EVENT, 'errorLogin'));
					} else {
						this.showError('signUp.errorLogin', formEventName(SIGNUP_EVENT, 'errorLogin'), error, InputName.login);
					}
				},
			},
			{
				id: 'email',
				fn: e => {
					const error = this.HandleForm.handleBlur(e);

					if (!error) {
						this.hideError('signUp.errorEmail', formEventName(SIGNUP_EVENT, 'errorEmail'));
					} else {
						this.showError('signUp.errorEmail', formEventName(SIGNUP_EVENT, 'errorEmail'), error, InputName.email);
					}
				},
			},
			{
				id: 'phone',
				fn: e => {
					const error = this.HandleForm.handleBlur(e);

					if (!error) {
						this.hideError('signUp.errorPhone', formEventName(SIGNUP_EVENT, 'errorPhone'));
					} else {
						this.showError('signUp.errorPhone', formEventName(SIGNUP_EVENT, 'errorPhone'), error, InputName.phone);
					}
				},
			},
			{
				id: 'password',
				fn: e => {
					const error = this.HandleForm.handleBlur(e);

					if (!error) {
						this.hideError('signUp.errorPassword', formEventName(SIGNUP_EVENT, 'errorPassword'));
					} else {
						this.showError('signUp.errorPassword', formEventName(SIGNUP_EVENT, 'errorPassword'), error, InputName.password);
					}
				},
			},
			{
				id: 'repeatPassword',
				fn: e => {
					const error = this.HandleForm.handleBlur(e);

					if (!error) {
						this.hideError('signUp.errorPasswordAgain', formEventName(SIGNUP_EVENT, 'errorPasswordAgain'));
					} else {
						this.showError('signUp.errorPasswordAgain', formEventName(SIGNUP_EVENT, 'errorPasswordAgain'), error, InputName.repeatPassword);
					}
				},
			},
		],
		submit: [
			{
				id: 'signUpForm',
				fn: e => {
					e.preventDefault();
					const isFormValid = this.validateElements(e, 'signUp', SIGNUP_EVENT);
					if (!isFormValid) {
						return;
					}

					const formData = this.HandleForm.handleSubmit(e);
					if (!formData) {
						return;
					}

					SignUpController.signUp(formData);
				},
			},
		],
	};
}

export const {signUpEvents} = new Services();
