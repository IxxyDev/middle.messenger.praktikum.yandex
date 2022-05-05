import {BaseApi, HOST} from "../baseApi";
import {Http, Options} from "../../services/http/http";
import {ErrorResponse, GetUserInfoResponse} from "../interfaces";

export class GetUserInfo extends BaseApi {
  public async read(options: Options): Promise<GetUserInfoResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/auth/user`)
    return await http.get<GetUserInfoResponse | ErrorResponse>('', options)
  }
}

export class GetUserInfoById extends BaseApi {
  public async create(options: Options, userId: string): Promise<GetUserInfoResponse | ErrorResponse> {
    const http = new Http(`${HOST}/api/v2/auth/user/`)
    return await http.get<GetUserInfoResponse | ErrorResponse>(userId, options)
  }
}

export class ChangeAvatar extends BaseApi {
  public async update(options: Options): Promise<GetUserInfoResponse | null> {
    const http = new Http(`${HOST}/api/v2/user/profile/avatar`)
    return await http.put<GetUserInfoResponse | null>('', options)
  }
}

export class ChangePassword extends BaseApi {
  public async update(options: Options): Promise<ErrorResponse | null> {
    const http = new Http(`${HOST}/api/v2/user/password`)
    return await http.put<ErrorResponse | null>('', options)
  }
}

export class ChangeUser extends BaseApi {
  public async update(options: Options): Promise<GetUserInfoResponse | null> {
    const http = new Http(`${HOST}/api/v2/user/profile`)
    return await http.put<GetUserInfoResponse | null>('', options)
  }
}
