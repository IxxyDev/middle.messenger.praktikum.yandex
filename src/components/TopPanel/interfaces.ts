import { Props } from '../../shared/global'
import { ChatProps } from '../Chat/interfaces'

export interface TopPanelProps extends Props {
  chatName: string
  currentChat: ChatProps | undefined
}
