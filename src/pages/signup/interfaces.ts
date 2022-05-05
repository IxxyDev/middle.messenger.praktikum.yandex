import { Props } from "../../shared/global";
import { InputProps } from "../../components/Input/interfaces";

export interface SignUpProps extends Props {
  register: { inputs: InputProps[] }
}
