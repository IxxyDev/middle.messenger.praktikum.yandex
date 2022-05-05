import { SignInProps } from "./interfaces";

export const signInPageState: SignInProps = {
  login: {
    inputs: [{
      id: "login",
      label: "Login",
      placeholder: "Login",
      required: true,
      name: "login",
      type: "text"
    },
      {
        id: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        name: "password",
        type: "password"
      },
    ],
  }
}
