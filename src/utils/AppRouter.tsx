import {
    NOTFOUND_ROUTE,
    MAIN_ROUTE,
    LOGIN_ROUTE,
    REQUEST_ROUTE,
    ADMIN_ROUTE,
    SALES_ROUTE,
} from './constants/routes.consts'

import NotFound from '../pages/404'
import Home from '../pages/Home'
import RequestPage from '../pages/requests/index'
import AdminPanel from '../pages/adminPanel/index'
import salesPage from '../pages/sales/index'
import Login from '../pages/Login'
import Loading from '../components/Loading'

export const publicRoutes = [
    {
        path: NOTFOUND_ROUTE,
        Component: NotFound,
        Loader: Loading,
    },
    {
        path: MAIN_ROUTE,
        Component: Home,
        Loader: Loading,
    },
    {
        path: LOGIN_ROUTE,
        Component: Login,
        Loader: Loading,
    },
    {
        path: REQUEST_ROUTE,
        Component: RequestPage,
        Loader: Loading,
    },
    { path: SALES_ROUTE, Component: salesPage, Loader: Loading },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel,
        Loader: Loading,
    },
]

export const clientRoutes = [{ path: SALES_ROUTE, Component: salesPage, Loader: Loading }]
