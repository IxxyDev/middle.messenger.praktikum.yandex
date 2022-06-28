import { AvatarProps } from '../Avatar/interfaces'

export type Contact = {
  id: number
  fullName: string
  avatar: AvatarProps
}

export interface FoundChatsProps {
  users: Contact[] | []
}
