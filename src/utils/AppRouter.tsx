import { NOTFOUND_ROUTE } from './constants/routes.consts'

import NotFound from '../pages/404'
import Loading from '../components/Loading'

export const publicRoutes = [
    {
        path: NOTFOUND_ROUTE,
        Component: NotFound,
        Loader: Loading,
    },
]
