import { HandleError } from "../../services/error";
import { ElementEvents } from "../../shared/global";
import store from "../../shared/store/store";
import { formPathFromArray } from "../../shared/utils/formPathFromArray";
import { SETTINGS_EVENT } from "./events";
import { formEventName } from "../../shared/utils/formEventName";
import { router } from "../../routes";
import { LogOutController } from "../../controllers/auth/logout";
import { InputName } from "../../services/form/interfaces";
import { ChangeProfileController } from "../../controllers/profile/changeProfile";

class SettingsService extends HandleError {
  public settingsEveents: ElementEvents = {
    change: [
      {
        id: 'changeAvatarPopup',
        fn: e => {
          e.preventDefault()
          const files = (e.target as HTMLInputElement).files
          if (!files) return

          const imageSrc = window.URL.createObjectURL(files[0])
          store.setState(
            formPathFromArray(['settingsPage', 'changeAvatarPopup']),
            {
              ...store.getState().settingsPage.changeAvatarPopup,
              imgSrc: imageSrc,
              blobImgSrc: files[0],
              changeAvatarButton: {
                ...store.getState().settingsPage.changeAvatarPopup.changeAvatarButton,
                isDisabled: false
              }
            },
            formEventName(SETTINGS_EVENT, 'changeAvatarPopup')
          )
        }
      }
    ],
    click: [
      {
        id: 'toChat',
        fn: e => {
          e.preventDefault()
          router.go('/chat')
        }
      },
      {
        id: 'logout',
        fn: e => {
          e.preventDefault()
          LogOutController.logOut()
        }
      },
      {
        id: 'openChangeAvatarPopup',
        fn: e => {
          e.preventDefault()
          store.setState(
            formPathFromArray(['settingsPage', 'changeAvatarPopup']),
            {
              ...store.getState().settingsPage.changeAvatarPopup,
              isOpened: true
            },
            formEventName(SETTINGS_EVENT, 'changeAvatarPopup')
          )
        }
      },
      {
        id: 'changeAvatarPopup',
        fn: e => {
          const popup = (e.target as HTMLDivElement).getAttribute('id') === 'changeAvatarPopup'
          if (!popup) return

          store.setState(
            formPathFromArray(['settingsPage', 'changeAvatarPopup']),
            {
              ...store.getState().settingsPage.changeAvatarPopup,
              isOpened: false
            },
            formEventName(SETTINGS_EVENT, 'changeAvatarPopup')
          )
        }
      }
    ],
    focus: [
      {
        id: 'first_name',
        fn: e => this.HandleForm.handleFocus(e)
      },
      {
        id: 'second_name',
        fn: e => this.HandleForm.handleFocus(e)
      },
      {
        id: 'login',
        fn: e => this.HandleForm.handleFocus(e)
      },
      {
        id: 'email',
        fn: e => this.HandleForm.handleFocus(e)
      },
      {
        id: 'phone',
        fn: e => this.HandleForm.handleFocus(e)
      },
      {
        id: 'oldPassword',
        fn: e => this.HandleForm.handleFocus(e)
      },
      {
        id: 'password',
        fn: e => this.HandleForm.handleFocus(e)
      },
      {
        id: 'newPassword',
        fn: e => this.HandleForm.handleFocus(e)
      },
    ],
    blur: [
      {
        id: 'first_name',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('settingsPage.errorName', formEventName(SETTINGS_EVENT, 'errorName'));
          } else {
            this.showError('settingsPage.errorName', formEventName(SETTINGS_EVENT, 'errorName'), error, InputName.FirstName);
          }
        },
      },
      {
        id: 'second_name',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('settingsPage.errorSurname', formEventName(SETTINGS_EVENT, 'errorSurname'));
          } else {
            this.showError('settingsPage.errorSurname', formEventName(SETTINGS_EVENT, 'errorSurname'), error, InputName.SecondName);
          }
        },
      },
      {
        id: 'login',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('settingsPage.errorLogin', formEventName(SETTINGS_EVENT, 'errorLogin'));
          } else {
            this.showError('settingsPage.errorLogin', formEventName(SETTINGS_EVENT, 'errorLogin'), error, InputName.Login);
          }
        },
      },
      {
        id: 'email',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('settingsPage.errorEmail', formEventName(SETTINGS_EVENT, 'errorEmail'));
          } else {
            this.showError('settingsPage.errorEmail', formEventName(SETTINGS_EVENT, 'errorEmail'), error, InputName.Email);
          }
        },
      },
      {
        id: 'phone',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('settingsPage.errorPhone', formEventName(SETTINGS_EVENT, 'errorPhone'));
          } else {
            this.showError('settingsPage.errorPhone', formEventName(SETTINGS_EVENT, 'errorPhone'), error, InputName.Phone);
          }
        },
      },
      {
        id: 'oldPassword',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('settingsPage.errorOldPassword', formEventName(SETTINGS_EVENT, 'errorOldPassword'));
          } else {
            this.showError('settingsPage.errorOldPassword', formEventName(SETTINGS_EVENT, 'errorOldPassword'), error, InputName.OldPassword);
          }
        },
      },
      {
        id: 'password',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('settingsPage.errorPassword', formEventName(SETTINGS_EVENT, 'errorPassword'));
          } else {
            this.showError('settingsPage.errorPassword', formEventName(SETTINGS_EVENT, 'errorPassword'), error, InputName.Password);
          }
        },
      },
      {
        id: 'newPassword',
        fn: e => {
          const error = this.HandleForm.handleBlur(e);

          if (!error) {
            this.hideError('settingsPage.errorPasswordAgain', formEventName(SETTINGS_EVENT, 'errorPasswordAgain'));
          } else {
            this.showError('settingsPage.errorPasswordAgain', formEventName(SETTINGS_EVENT, 'errorPasswordAgain'), error, InputName.PasswordAgain);
          }
        },
      },
    ],
    submit: [
      {
        id: 'profileForm',
        fn: e => {
          e.preventDefault();
          const isFormValid = this.validateElements(e, 'settingsPage', SETTINGS_EVENT);

          if (!isFormValid) {
            return;
          }

          const formData = this.HandleForm.handleSubmit(e);

          if (!formData) {
            return;
          }
          ChangeProfileController.changeProfile(formData);
        },
      },
      {
        id: 'form-password',
        fn: e => {
          e.preventDefault();
          const isFormValid = this.validateElements(e, 'settingsPage', SETTINGS_EVENT);

          if (!isFormValid) {
            return;
          }

          const formData = this.HandleForm.handleSubmit(e);

          if (!formData) {
            return;
          }

          ChangeProfileController.changeProfile({
            oldPassword: formData.oldPassword,
            newPassword: formData.password
          });
        },
      },
      {
        id: 'popupAvatar',
        fn: e => {
          e.preventDefault();
          const form = new FormData();
          const avatarBlobImg = store.getState().settingsPage.changeAvatar.blobImgSrc;
          form.append('avatar', avatarBlobImg, 'my-avatar.png');
          ChangeProfileController.changeProfile(form);
        },
      },
    ],
  }
}
