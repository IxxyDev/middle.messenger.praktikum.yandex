import {SignIn} from "../../api/auth/auth-api";
import {Indexed} from "../../shared/global";
import {ResponseType} from "../../services/http/http";
import {ErrorResponse} from "../../api/interfaces";
import {router} from "../../routes";
import {SignInModel} from "../interfaces";


const signInApi = new SignIn()

const signInValidator = (data: Record<string, unknown>): data is SignInModel => {
  const keys = Object.keys(data)
  return ['login', 'password'].every((key: string) => keys.includes(key))
}

export class SignInController {
  static async signIn(data: Indexed): Promise<void> {
    try {
      const isValid = signInValidator(data)
      if (!isValid) throw new Error('Data is invalid')

      const preparedData = {
        headers: {
          'content-type': 'application/json',
        },
        responseType: ResponseType.json,
        withCredentials: true,
        data: data,
      }
      const res: ErrorResponse | null = await signInApi.create(preparedData)
      if (res) throw new Error(res.reason)
      router.go('/messenger')
    } catch (e) {
      console.error(e)
    }
  }
}
