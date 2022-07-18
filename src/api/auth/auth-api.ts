import { BaseApi, HOST } from '../baseApi'
import { Http, Options } from '../../services/http/http'
import { ErrorResponse, SignUpResponse } from '../interfaces'

export class SignIn extends BaseApi {
  public async create(options: Options): Promise<ErrorResponse | undefined> {
    const http = new Http(`${HOST}/api/v2/auth/signin`)
    return http.post<ErrorResponse | undefined>('', options)
  }
}

export class SignUp extends BaseApi {
  public async create(options: Options): Promise<SignUpResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/auth/signup`)
    return http.post<SignUpResponse | ErrorResponse>('', options)
  }
}

export class LogOut extends BaseApi {
  public async create(options: Options): Promise<ErrorResponse | undefined> {
    const http = new Http(`${HOST}/api/v2/auth/logout`)
    return http.post<ErrorResponse | undefined>('', options)
  }
}
