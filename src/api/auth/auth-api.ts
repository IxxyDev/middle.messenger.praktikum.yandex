import {BaseApi, HOST} from "../baseApi";
import {Http, Options} from "../../services/http/http";
import {ErrorResponse, SignUpResponse} from "../interfaces";

export class SignIn extends BaseApi {
  public async create(options: Options): Promise<ErrorResponse | null> {
    debugger
    const http = new Http(`${HOST}/api/v2/auth/signin`)
    return await http.post<ErrorResponse | null>('', options)
  }
}

export class SignUp extends BaseApi {
  public async create(options: Options): Promise<SignUpResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/auth/signup`)
    return await http.post<SignUpResponse | ErrorResponse>('', options)
  }
}

export class LogOut extends BaseApi {
  public async create(options: Options): Promise<ErrorResponse | null> {
    const http = new Http(`${HOST}/api/v2/auth/logout`)
    return await http.post<ErrorResponse | null>('', options)
  }
}

