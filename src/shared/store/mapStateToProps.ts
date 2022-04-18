import store from './store'
import {State} from './types'

type PageNames = 'page404' | 'page500' | 'chat' | 'signIn' | 'signUp' | 'settings'

export function mapStateToProps(path: string): void  {
  const reducedPath = path
    .split('.')
    .reduce((acc: State, key: PageNames) => acc[key], store.getState())

  this.setProps(reducedPath)
}