import {Router} from './shared/Router/Router'
import {Page404} from './pages/404/404'

export const router = new Router('root')

router.use('/404', Page404)