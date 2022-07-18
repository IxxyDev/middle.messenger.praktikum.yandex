export type CreateChatResponse = { id: number }
export type ErrorResponse = { reason: string }
export type ChatTokenResponse = { token: string }
export type GetChatsResponse = Chat[]
export type GetUsersResponse = User[]
export type SignUpResponse = { id: number }
export type GetUserInfoResponse = User

type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  avatar: string
  email: string
  login: string
  phone: string
}

type LastMessage = {
  user: User
  time: string
  content: string
}

type Chat = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: LastMessage
}
