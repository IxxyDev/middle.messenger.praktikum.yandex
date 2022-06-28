import { Props } from '../../shared/global'

export const ERROR_SHOWN = 'errorMessage_shown'

export interface ErrorMessageProps extends Props {
  errorText?: string
  additionalClass?: string
}
