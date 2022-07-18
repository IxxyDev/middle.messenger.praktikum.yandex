import { Options } from '../services/http/http'

export const HOST = 'https://ya-praktikum.tech'
export const WSS_HOST = 'wss://ya-praktikum.tech'

export class BaseApi {
  async read(options: Options, ...rest: unknown[]): Promise<unknown> {
    throw new Error('Error')
  }

  async create(options: Options, ...rest: unknown[]): Promise<unknown> {
    throw new Error('Error')
  }

  async update(options: Options, ...rest: unknown[]): Promise<unknown> {
    throw new Error('Error')
  }

  async delete(options: Options, ...rest: unknown[]): Promise<unknown> {
    throw new Error('Error')
  }
}
