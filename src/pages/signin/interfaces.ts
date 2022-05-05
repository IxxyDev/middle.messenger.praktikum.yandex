import { Props } from "../../shared/global";
import { InputProps } from "../../components/Input/interfaces";

export interface SignInProps extends Props {
  login: { inputs: InputProps[] }
}
