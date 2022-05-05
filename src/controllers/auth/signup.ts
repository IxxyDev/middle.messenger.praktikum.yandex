import {SignUp} from "../../api/auth/auth-api";
import {Indexed} from "../../shared/global";
import {ResponseType} from "../../services/http/http";
import {ErrorResponse, SignUpResponse} from "../../api/interfaces";
import {router} from "../../routes";
import {SignUpModel} from "../interfaces";


const signUpApi = new SignUp()

const signUpValidator = (data: Indexed): data is SignUpModel => {
  const keys = Object.keys(data)
  const validationKeys = ['first_name', 'second_name', 'login', 'email', 'phone', 'password']
  return validationKeys.every((key: string) => keys.includes(key))
}

const isError = (res: Indexed): res is ErrorResponse => {
  return !!res?.reason
}

export class SignUpController {
  static async signUp(data: Indexed): Promise<void> {
    try {
      const isValid = signUpValidator(data)
      if (!isValid) throw new Error('Data is invalid')

      const preparedData = {
        headers: {
          'content-type': 'application/json',
        },
        responseType: ResponseType.json,
        withCredentials: true,
        data: data,
      }
      const res: SignUpResponse | ErrorResponse = await signUpApi.create(preparedData)
      if (isError(res)) throw new Error(res.reason)
      router.go('/messenger')
    } catch (e) {
      console.error(e)
    }
  }
}
