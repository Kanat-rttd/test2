import { createStaticRanges } from 'react-date-range'

const today = new Date()

export const defaultStaticRanges = createStaticRanges([
    {
        label: 'За неделю',
        range: () => ({
            startDate: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - today.getDay(),
            ),
            endDate: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + (6 - today.getDay()),
            ),
        }),
    },
    {
        label: 'За месяц',
        range: () => ({
            startDate: new Date(today.getFullYear(), today.getMonth(), 1),
            endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
        }),
    },
    {
        label: 'За три месяца',
        range: () => ({
            startDate: new Date(today.getFullYear(), today.getMonth() - 2, 1),
            endDate: new Date(),
        }),
    },
    {
        label: 'Полгода',
        range: () => ({
            startDate: new Date(today.getFullYear(), today.getMonth() - 5, 1),
            endDate: new Date(),
        }),
    },
    {
        label: 'Год',
        range: () => ({
            startDate: new Date(today.getFullYear() - 1, 0, 1),
            endDate: new Date(),
        }),
    },
])
