import {
    ADMIN_ROUTE,
    // NOTFOUND_ROUTE,
    // REQUEST_ROUTE,
    ADMIN_PRODUCTS_ROUTE,
    ADMIN_USERS_ROUTE,
    REQUEST_PROCESSING_ROUTE,
    REQUEST_PROCESSED_ROUTE,
    SALES_ROUTE,
    SALES_REQUEST_FORM_ROUTE,
    SALES_HISTORY_ROUTE,
    MIXERS_ROUTE,
    // MIXERS_PASTRY_ROUTE,
    MIXERS_BAKINGPRODUCTS_ROUTE,
    MIXERS_REMAIN_PRODUCTS_ROUTE,
    MIXERS_REMAIN_RAW_MATERIALS_ROUTE,
    MIXERS_SHIFT_ACCOUNTING_ROUTE,
    // RELEASE_ROUTE,
    RELEASE_DISTRIBUTION_ROUTE,
    RELEASE_REFUND_ROUTE,
    ADMIN_RELEASE_ROUTE,
    ADMIN_UNIQUEPRICE_ROUTE,
    FINANCE_ROUTE,
    FINANCE_INPUT_ROUTE,
    FINANCE_HISTORY_ROUTE,
    FINANCE_REPORT_ROUTE,
    PURCHASE_PRODUCTS_ROUTE,
    PURCHASE_ROUTE,
    PURCHASE_DEBT_ROUTE,
    INVENTORY_ROUTE,
    INVENTORY_DETAILS_ROUTE,
    INVENTORY_HISTORY_ROUTE,
    ADMIN_PROVIDER_ROUTE,
    ADMIN_GOODS_ROUTE,
    INVENTORY_FACT_ROUTE,
    // SELLS_ROUTE,
    SELLS_JOURNAL_ROUTE,
    SELLS_INVOICE_ROUTE,
    SELLS_DEBT_ACCOUNTING_ROUTE,
    SELLS_DEBT_TRANSFER_ROUTE,
    ADMIN_MAGAZINES_ROUTE,
    ADMIN_OVERPRICE_ROUTE,
    ADMIN_DEPART_PERSONAL_ROUTE,
    REPORT_ROUTE,
    BREAD_REPORT_ROUTE,
    // RELEASE_REPORT_ROUTE,
    VISIT_REPORT_ROUTE,
    RECONCILIATION_REPORT_ROUTE,
} from './routes.consts'

type MenuItem = {
    route: string
    label: string
    path?: string
    allowedClasses?: string[]
}

export const menuItems: MenuItem[] = [
    // {
    //     route: MAIN_ROUTE,
    //     label: 'Главная Страница',
    //     allowedClasses: ['Admin', 'Client'],
    // },
    {
        route: ADMIN_ROUTE,
        label: 'Админ панель',
        allowedClasses: ['Admin'],
    },
    {
        route: MIXERS_ROUTE,
        label: 'Производство',
        allowedClasses: ['Admin', 'Client'],
    },
    // {
    //     route: REQUEST_ROUTE,
    //     label: 'Заявки',
    //     allowedClasses: ['Admin'],
    // },
    // {
    //     route: NOTFOUND_ROUTE,
    //     label: 'Нотфаунд',
    //     allowedClasses: ['Admin', 'Client'],
    // },
    {
        route: SALES_ROUTE,
        label: 'Продажи',
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: PURCHASE_ROUTE,
        label: 'Закуп',
        allowedClasses: ['Admin', 'Client'],
    },
    // {
    //     route: RELEASE_ROUTE,
    //     label: 'Выдача',
    //     allowedClasses: ['Admin', 'Client'],
    // },
    {
        route: FINANCE_ROUTE,
        label: 'Финансы',
        allowedClasses: ['Admin'],
    },
    {
        route: REPORT_ROUTE,
        label: 'Отчеты',
        allowedClasses: ['Admin'],
    },
    {
        route: INVENTORY_ROUTE,
        label: 'Инвентаризация',
        allowedClasses: ['Admin', 'Client'],
    },
    // {
    //     route: SELLS_ROUTE,
    //     label: 'Продажи',
    //     allowedClasses: ['Admin', 'Client'],
    // },
]

export const subMenuItems: MenuItem[] = [
    {
        route: ADMIN_USERS_ROUTE,
        label: 'Адмперсонал',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_DEPART_PERSONAL_ROUTE,
        label: 'Цехперсонал',
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
        route: ADMIN_PRODUCTS_ROUTE,
        label: 'Продукты',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_UNIQUEPRICE_ROUTE,
        label: 'Уникальные цены',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_PROVIDER_ROUTE,
        label: 'Поставщики',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_GOODS_ROUTE,
        label: 'Tовары',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_OVERPRICE_ROUTE,
        label: 'Сверху',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: ADMIN_MAGAZINES_ROUTE,
        label: 'Магазины',
        path: ADMIN_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: REQUEST_PROCESSING_ROUTE,
        label: 'Обработка',
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin'],
    },
    {
        route: REQUEST_PROCESSED_ROUTE,
        label: 'Обработанные заявки',
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin'],
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
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: RELEASE_REFUND_ROUTE,
        label: 'Возврат',
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: MIXERS_REMAIN_RAW_MATERIALS_ROUTE,
        label: 'Остаток сырья',
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: MIXERS_REMAIN_PRODUCTS_ROUTE,
        label: 'Остаток продукции',
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: MIXERS_SHIFT_ACCOUNTING_ROUTE,
        label: 'Учёт смен',
        path: MIXERS_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: SELLS_JOURNAL_ROUTE,
        label: 'Журнал Продаж',
        path: SALES_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: SELLS_INVOICE_ROUTE,
        label: 'Накладные',
        path: SALES_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: SELLS_DEBT_ACCOUNTING_ROUTE,
        label: 'Учет долгов',
        path: SALES_ROUTE,
        allowedClasses: ['Admin', 'Client'],
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
        route: SELLS_DEBT_TRANSFER_ROUTE,
        label: 'Перевод Долга',
        path: SALES_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: FINANCE_INPUT_ROUTE,
        label: 'Ввод',
        path: FINANCE_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: FINANCE_HISTORY_ROUTE,
        label: 'История финансов',
        path: FINANCE_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: FINANCE_REPORT_ROUTE,
        label: 'Фин. отчет',
        path: FINANCE_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },

    {
        route: PURCHASE_PRODUCTS_ROUTE,
        label: 'Закуп',
        path: PURCHASE_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: PURCHASE_DEBT_ROUTE,
        label: 'Долги по закупу',
        path: PURCHASE_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: INVENTORY_FACT_ROUTE,
        label: 'Ввод факт',
        path: INVENTORY_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: INVENTORY_DETAILS_ROUTE,
        label: 'Инвентаризация',
        path: INVENTORY_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: INVENTORY_HISTORY_ROUTE,
        label: 'История корректировок',
        path: INVENTORY_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: BREAD_REPORT_ROUTE,
        label: 'Отчет по продукции',
        path: REPORT_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    // {
    //     route: RELEASE_REPORT_ROUTE,
    //     label: 'Отчет по реализации',
    //     path: REPORT_ROUTE,
    //     allowedClasses: ['Admin', 'Client'],
    // },
    {
        route: VISIT_REPORT_ROUTE,
        label: 'Отчет по посещению',
        path: REPORT_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
    {
        route: RECONCILIATION_REPORT_ROUTE,
        label: 'Акт сверки',
        path: REPORT_ROUTE,
        allowedClasses: ['Admin', 'Client'],
    },
]
