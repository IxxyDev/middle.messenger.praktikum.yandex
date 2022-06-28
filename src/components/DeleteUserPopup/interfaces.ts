import { Props } from '../../shared/global'
import { FoundChatsProps } from '../FoundChats/interfaces'

export interface DeleteUserPopupProps extends Props {
  isOpened: boolean
  foundChats: FoundChatsProps
}
