import {Props} from "../../shared/global";

type FormInput = {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean
  name: string;
  type: string;
  maxlength?: string;
  minlength?: string;
  autofocus?: boolean;
  autocomplete?: boolean;
}

export interface FormProps extends Props {
  inputs: FormInput[],
  method: 'GET' | 'POST' | 'DELETE'
  action: string;
  submitButtonLabel: string;
}
