import { SignUpProps } from "./interfaces";

export const signUpPageState: SignUpProps = {
  register: {
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
        id: "lastName",
        label: "Last name",
        placeholder: "Last name",
        required: true,
        name: "lastName",
        type: "password"
      },
      {
        id: "phone",
        label: "Phone",
        placeholder: "Phone",
        required: true,
        name: "phone",
        type: "phone"
      },
      {
        id: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        name: "password",
        type: "password"
      },
      {
        id: "repeatPassword",
        label: "Repeat password",
        placeholder: "Repeat password",
        required: true,
        name: "repeatPassword",
        type: "password"
      },
    ],
  }
}
