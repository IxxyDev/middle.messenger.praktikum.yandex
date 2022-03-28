import {Page500Props} from "../screens/500/types";
import {Page404Props} from "../screens/404/types";
import {ChatProps} from "../screens/chat/types";
import {SignInProps} from "../screens/signin/types";
import {SignUpProps} from "../screens/signup/types";
import {SettingsProps} from "../screens/settings/types";

export type State = {
  500: Page500Props
  404: Page404Props
  chat: ChatProps
  signIn: SignInProps
  signUp: SignUpProps
  settings: SettingsProps
}