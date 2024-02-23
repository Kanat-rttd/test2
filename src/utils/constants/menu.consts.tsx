import {
    ADMIN_ROUTE,
    MAIN_ROUTE,
    NOTFOUND_ROUTE,
    REQUEST_ROUTE,
    ADMIN_CLIENTS_ROUTE,
    ADMIN_PRODUCTS_ROUTE,
    ADMIN_USERS_ROUTE,
    REQUEST_PROCESSING_ROUTE,
    REQUEST_PROCESSED_ROUTE,
    SALES_ROUTE,
    SALES_REQUEST_FORM_ROUTE,
    SALES_HISTORY_ROUTE,
    MIXERS_ROUTE,
    MIXERS_PASTRY_ROUTE,
    MIXERS_BAKINGPRODUCTS_ROUTE,
    RELEASE_ROUTE,
    RELEASE_DISTRIBUTION_ROUTE,
    RELEASE_REFUND_ROUTE,
    ADMIN_RELEASE_ROUTE,
} from './routes.consts'

type MenuItem = {
    route: string
    label: string
    path?: string
    allowedClasses?: string[]
}

export const menuItems: MenuItem[] = [
    {
        route: MAIN_ROUTE,
        label: 'Главная Страница',
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: REQUEST_ROUTE,
        label: 'Заявки',
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_ROUTE,
        label: 'Админ панель',
        allowedClasses: ['Admin'],
    },
    {
        route: NOTFOUND_ROUTE,
        label: 'Нотфаунд',
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: SALES_ROUTE,
        label: 'Продажи',
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: MIXERS_ROUTE,
        label: 'Производство',
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: RELEASE_ROUTE,
        label: 'Выдача',
        allowedClasses: ['Admin', 'Client'],
    },
]

export const subMenuItems: MenuItem[] = [
    {
        route: ADMIN_CLIENTS_ROUTE,
        label: 'Клиенты',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_PRODUCTS_ROUTE,
        label: 'Продукты',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_USERS_ROUTE,
        label: 'Пользователи',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_RELEASE_ROUTE,
        label: 'Реализаторы',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: REQUEST_PROCESSED_ROUTE,
        label: 'Обработанные',
        path: REQUEST_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: REQUEST_PROCESSING_ROUTE,
        label: 'Обработка',
        path: REQUEST_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: SALES_REQUEST_FORM_ROUTE,
        label: 'Форма заявок',
        path: SALES_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: SALES_HISTORY_ROUTE,
        label: 'История заказов',
        path: SALES_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: MIXERS_PASTRY_ROUTE,
        label: 'Заявки',
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: MIXERS_BAKINGPRODUCTS_ROUTE,
        label: 'Выпечка',
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: RELEASE_DISTRIBUTION_ROUTE,
        label: 'Выдача',
        path: RELEASE_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: RELEASE_REFUND_ROUTE,
        label: 'Возврат',
        path: RELEASE_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
]
