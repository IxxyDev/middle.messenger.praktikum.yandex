import { Props } from "../../shared/global";
import { InputProps } from "../../components/Input/interfaces";

export interface SignUpProps extends Props {
  register: {
    inputs: InputProps[],
    submitButtonLabel: string
    title: string
    linkText: string
    linkId: string
    formId: string
  }
}
