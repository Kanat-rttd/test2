import {
    ADMIN_ROUTE,
    MAIN_ROUTE,
    NOTFOUND_ROUTE,
    REQUEST_ROUTE,
    ADMIN_CLIENTS_ROUTE,
    ADMIN_PRODUCTS_ROUTE,
    ADMIN_USERS_ROUTE,
    REQUEST_REQUESTS_ROUTE,
    REQUEST_BAKING_ROUTE,
} from './routes.consts'

type MenuItem = {
    route: string
    label: string
    path?: string
}

export const menuItems: MenuItem[] = [
    {
        route: MAIN_ROUTE,
        label: 'Главная Страница',
    },
    {
        route: REQUEST_ROUTE,
        label: 'Заявки',
    },
    {
        route: ADMIN_ROUTE,
        label: 'Админ панель',
    },
    {
        route: NOTFOUND_ROUTE,
        label: 'Нотфаунд',
    },
]

export const subMenuItems: MenuItem[] = [
    {
        route: ADMIN_CLIENTS_ROUTE,
        label: 'Клиенты',
        path: ADMIN_ROUTE,
    },
    {
        route: ADMIN_PRODUCTS_ROUTE,
        label: 'Продукты',
        path: ADMIN_ROUTE,
    },
    {
        route: ADMIN_USERS_ROUTE,
        label: 'Пользователи',
        path: ADMIN_ROUTE,
    },
    {
        route: REQUEST_REQUESTS_ROUTE,
        label: 'Заявки',
        path: REQUEST_ROUTE,
    },
    {
        route: REQUEST_BAKING_ROUTE,
        label: 'Выпечка',
        path: REQUEST_ROUTE,
    },
]
