import {
    NOTFOUND_ROUTE,
    MAIN_ROUTE,
    LOGIN_ROUTE,
    REQUEST_ROUTE,
    ADMIN_ROUTE,
    SALES_ROUTE,
    MIXERS_ROUTE,
    RELEASE_ROUTE,
    FINANCE_ROUTE,
    PURCHASE_ROUTE,
} from './constants/routes.consts'

import NotFound from '../pages/404'
import Home from '../pages/Home'
import RequestPage from '../pages/requests/index'
import AdminPanel from '../pages/adminPanel/index'
import salesPage from '../pages/sales/index'
import Login from '../pages/Login'
import Loading from '../components/Loading'
import MixersPage from '@/pages/mixers'
import ReleasePage from '@/pages/release'
import FinancePage from '@/pages/finance'
import PurchasePage from '@/pages/purchase'

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
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel,
        Loader: Loading,
    },
    {
        path: MIXERS_ROUTE,
        Component: MixersPage,
        Loader: Loading,
    },
    {
        path: RELEASE_ROUTE,
        Component: ReleasePage,
        Loader: Loading,
    },
    {
        path: FINANCE_ROUTE,
        Component: FinancePage,
        Loader: Loading,
    },
    {
        path: PURCHASE_ROUTE,
        Component: PurchasePage,
        Loader: Loading,
    },
]

export const adminRoutes = []

export const clientRoutes = [{ path: SALES_ROUTE, Component: salesPage, Loader: Loading }]
