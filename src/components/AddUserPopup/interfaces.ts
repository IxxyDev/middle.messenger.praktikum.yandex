import { Props } from '../../shared/global'
import { FoundChatsProps } from '../FoundChats/interfaces'

export interface AddUserPopupProps extends Props {
  isOpened: boolean
  foundChats: FoundChatsProps
}
