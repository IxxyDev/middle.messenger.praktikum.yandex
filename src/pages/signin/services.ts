import { HandleError } from "../../services/error";
import { router } from "../../routes";
import { ElementEvents } from "../../shared/global";
import { formEventName } from "../../shared/utils/formEventName";
import { SIGNIN_EVENT } from "./events";
import { SignInController } from "../../controllers/auth/signin";
import { InputName } from "../../services/form/interfaces";

class SignInServices extends HandleError {
  public signInEvents: ElementEvents = {
    click: [
      {
        id: 'toSignUp',
        fn: e => {
          e.preventDefault();
          router.go('/sign-up');
        },
      },
    ],
    focus: [
      {
        id: 'login',
        fn: e => this.HandleForm.handleFocus(e)
      },
      {
        id: 'password',
        fn: e => this.HandleForm.handleFocus(e)
      },
    ],
    blur: [
      {
        id: 'login',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('signInPage.errorLogin', formEventName(SIGNIN_EVENT, 'errorLogin'));
          } else {
            this.showError('signInPage.errorLogin', formEventName(SIGNIN_EVENT, 'errorLogin'), error, InputName.login);
          }
        },
      },
      {
        id: 'password',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('signInPage.errorPassword', formEventName(SIGNIN_EVENT, 'errorPassword'));
          } else {
            this.showError('signInPage.errorPassword', formEventName(SIGNIN_EVENT, 'errorPassword'), error, InputName.password);
          }
        },
      },
    ],
    submit: [
      {
        id: 'form',
        fn: e => {
          e.preventDefault();
          const isFormValid = this.validateElements(e, 'signInPage', SIGNIN_EVENT);
          if (!isFormValid) return

          const formData = this.HandleForm.handleSubmit(e);
          if (!formData) return
          SignInController.signIn(formData);
        },
      },
    ],
  }
}

export const { signInEvents } = new SignInServices();
