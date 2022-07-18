import { BaseApi, HOST } from '../baseApi'
import { Http, Options } from '../../services/http/http'
import { ErrorResponse, GetUserInfoResponse } from '../interfaces'

export class GetUserInfo extends BaseApi {
  public async read(options: Options): Promise<GetUserInfoResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/auth/user`)
    return http.get<GetUserInfoResponse | ErrorResponse>('', options)
  }
}

export class GetUserInfoById extends BaseApi {
  public async read(options: Options, userId: string): Promise<GetUserInfoResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/auth/user/`)
    return http.get<GetUserInfoResponse | ErrorResponse>(userId, options)
  }
}

export class ChangeAvatar extends BaseApi {
  public async update(options: Options): Promise<GetUserInfoResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/user/profile/avatar`)
    return http.put<GetUserInfoResponse | ErrorResponse>('', options)
  }
}

export class ChangePassword extends BaseApi {
  public async update(options: Options): Promise<ErrorResponse | undefined> {
    const http = new Http(`${HOST}/api/v2/user/password`)
    return http.put<ErrorResponse | undefined>('', options)
  }
}

export class ChangeUser extends BaseApi {
  public async update(options: Options): Promise<GetUserInfoResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/user/profile`)
    return http.put<GetUserInfoResponse | ErrorResponse>('', options)
  }
}
