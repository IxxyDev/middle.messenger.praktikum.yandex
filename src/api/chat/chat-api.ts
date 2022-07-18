import { Http, Options } from '../../services/http/http'
import { BaseApi, HOST } from '../baseApi'
import { ChatTokenResponse, CreateChatResponse, ErrorResponse, GetChatsResponse, GetUsersResponse } from '../interfaces'

export class CreateChat extends BaseApi {
  public async create(options: Options): Promise<CreateChatResponse | ErrorResponse | undefined> {
    const http = new Http(`${HOST}/api/v2/chats`)
    return http.post<CreateChatResponse | ErrorResponse | undefined>('', options)
  }
}

export class GetChats extends BaseApi {
  public async read(options: Options): Promise<GetChatsResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/chats`)
    return http.get<GetChatsResponse | ErrorResponse>('', options)
  }
}

export class AddUsers extends BaseApi {
  public async update(options: Options): Promise<ErrorResponse | undefined> {
    const http = new Http(`${HOST}/api/v2/chats/users`)
    return http.put<ErrorResponse | undefined>('', options)
  }
}

export class GetToken extends BaseApi {
  public async read(options: Options, chatId: number): Promise<ChatTokenResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/chats/token`)
    return http.post<ChatTokenResponse | ErrorResponse>(`${chatId}`, options)
  }
}

export class GetUsers extends BaseApi {
  public async read(options: Options): Promise<GetUsersResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/user/search`)
    return http.post<GetUsersResponse | ErrorResponse>('', options)
  }
}

export class GetUsersByChat extends BaseApi {
  public async read(options: Options, chatId: number): Promise<GetUsersResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/chats/`)
    return http.post<GetUsersResponse | ErrorResponse>(`${chatId}/users`, options)
  }
}

export class DeleteUsers extends BaseApi {
  public async delete(options: Options): Promise<ErrorResponse | undefined> {
    const http = new Http(`${HOST}/api/v2/chats/users`)
    return http.delete<ErrorResponse | undefined>('', options)
  }
}
