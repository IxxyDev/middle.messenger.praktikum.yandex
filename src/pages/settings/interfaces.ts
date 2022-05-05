import { Props } from "../../shared/global";
import { Input } from "../../components/Input/Input";

export interface SettingsPageProps extends Props {
  profileChange: Input[]
  passwordChange: Input[]
}
