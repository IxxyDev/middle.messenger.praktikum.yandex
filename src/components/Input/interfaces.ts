import { Props } from "../../shared/global";

export interface InputProps extends Props {
  type: string
  id: string
  name: string
  label: string
  placeholder?: string
  required?: boolean
}