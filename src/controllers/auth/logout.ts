import { LogOut } from '../../api/auth/auth-api'
import { ResponseType } from '../../services/http/http'
import { ErrorResponse } from '../../api/interfaces'
import { router } from '../../routes'

const logOutApi = new LogOut()

export class LogOutController {
  static async logOut(): Promise<void> {
    try {
      const preparedData = {
        responseType: ResponseType.JSON,
        withCredentials: true,
      }
      const res: ErrorResponse | undefined = await logOutApi.create(preparedData)
      if (res) {
        throw new Error(res.reason)
      }

      router.go('/')
    } catch (e) {
      console.error(e)
    }
  }
}
