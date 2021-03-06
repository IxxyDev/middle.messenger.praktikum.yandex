import { SignUp } from '../../api/auth/auth-api'
import { Indexed } from '../../shared/global'
import { ErrorResponse, SignUpResponse } from '../../api/interfaces'
import { router } from '../../routes'
import { SignUpModel } from '../interfaces'
import { prepareData } from '../prepareData'

const signUpApi = new SignUp()

const signUpValidator = (data: Indexed): data is SignUpModel => {
  const keys = Object.keys(data)
  const validationKeys = ['first_name', 'second_name', 'login', 'email', 'phone', 'password']
  return validationKeys.every((key: string) => keys.includes(key))
}

const isError = (res: Indexed): res is ErrorResponse => Boolean(res?.reason)

export class SignUpController {
  static async signUp(data: Indexed): Promise<void> {
    try {
      const isValid = signUpValidator(data)
      if (!isValid) {
        throw new Error('Data is invalid')
      }

      const res: SignUpResponse | ErrorResponse = await signUpApi.create(prepareData(data))
      if (isError(res)) {
        throw new Error(res.reason)
      }

      router.go('/chats')
    } catch (e) {
      console.error(e)
    }
  }
}
