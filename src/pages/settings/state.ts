import { SettingsPageProps } from "./interfaces";
import { ChangeAvatarPopupProps } from "../../components/ChangeAvatarPopup/interfaces";

export const settingsState: SettingsPageProps = {
  profileChange: {
    inputs: [{
        id: "email",
        label: "Email",
        placeholder: "Email",
        required: true,
        name: "email",
        type: "email"
      },
      {
        id: "login",
        label: "Login",
        placeholder: "Login",
        required: true,
        name: "login",
        type: "text"
      },
      {
        id: "name",
        label: "Name",
        placeholder: "Name",
        required: true,
        name: "name",
        type: "text"
      },
      {
        id: "surname",
        label: "Surname",
        placeholder: "Surname",
        required: true,
        name: "surname",
        type: "text"
      },
      {
        id: "nickname",
        label: "Nickname",
        placeholder: "Nickname",
        required: true,
        name: "nickname",
        type: "text"
      },
      {
        id: "phone",
        label: "Phone",
        placeholder: "Phone",
        required: true,
        name: "phone",
        type: "phone"
      }
    ]
  },
  passwordChange: {
    inputs: [{
        id: "oldPassword",
        label: "Old password",
        placeholder: "Old password",
        required: true,
        name: "oldPassword",
        type: "password"
      },
      {
        id: "newPassword",
        label: "New password",
        placeholder: "New password",
        required: true,
        name: "newPassword",
        type: "password"
      },
      {
        id: "repeatPassword",
        label: "Repeat new password",
        placeholder: "Repeat new password",
        required: true,
        name: "repeatPassword",
        type: "password"
      },
    ],
  },
};
