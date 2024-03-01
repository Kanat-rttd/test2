import { Avatar, Box, Select, Text } from '@chakra-ui/react'
import styles from '../style.module.css'
import DateRange from '../../../components/DateRange'
import { useState } from 'react'
import Drawler from '@/components/Drawler'
import { getAllFinances } from '@/utils/services/finance.service'
import useSWR from 'swr'

interface Finance {
    id: number
    amount: string
    date: Date
    category: string
    clientId: number
    account: string
    comment: string
}

const Report = () => {
    const { data: financeData } = useSWR<Finance[]>(['finance'], {
        fetcher: () => getAllFinances(),
    })

    console.log(financeData)

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })
    const score = [
        {
            label: 'Kaspi',
            value: 1,
        },
    ]

    const data = {
        initial: 2801106,
        data: {
            operational: {
                total: 0,
                data: [
                    {
                        name: 'Прикол',
                        total: 0,
                    },
                ],
            },
            financial: {
                total: 0,
                data: [
                    {
                        name: 'Не прикол',
                        total: 0,
                    },
                ],
            },
        },
        balance: 0,
        total: 2801106,
    }

    const operationalData = data?.data.operational.data
    const operationTotal = data?.data.operational.total

    const financialData = data?.data.financial.data
    const financialTotal = data?.data.financial.total

    const balance = data?.balance
    const total = data?.total

    return (
        <>
            <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
                </Box>
                <Avatar bg="teal.500" />
            </Box>
            <Box className={styles.container}>
                <Box display="flex" gap="10px">
                    <Box className={styles.scoreSelect}>
                        <Select
                            placeholder="Счет"
                            // value={selectedScore}
                            // onChange={handleChangeSelect}
                            width="100%"
                            background="w"
                        >
                            {score.map((s) => (
                                <option key={s.value} value={s.label}>
                                    {s.label}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Box width={'20%'}>
                        <DateRange
                            setSelectionRange={setSelectionRange}
                            selectionRange={selectionRange}
                        />
                    </Box>
                </Box>
                <Box w="100%" display="flex" justifyContent="center">
                    <Box
                        style={{
                            overflow: 'auto',
                            borderRadius: '5px',
                            width: '100%',
                            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <Row label="ОСТАТОК НА НАЧАЛО" value={data?.initial} />
                        {operationalData?.map((item, index) => (
                            <Row key={index} label={item.name} value={item.total} />
                        ))}
                        <Row
                            label="Движение средств от операционной деятельности"
                            value={operationTotal}
                            isTotal
                        />
                        {financialData?.map((item, index) => (
                            <Row key={index} label={item.name} value={item.total} />
                        ))}
                        <Row
                            label="Движение средств от финансовой деятельности"
                            value={financialTotal}
                            isTotal
                        />
                        <Row label="Баланс переводов" value={balance} />
                        <Row label="ОСТАТОК НА КОНЕЦ" value={total} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Report

const Row = ({
    label,
    value,
    isTotal,
}: {
    label: string
    value: number | undefined
    isTotal?: boolean
}) => (
    <Box
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 20,
            paddingLeft: isTotal ? '20px' : '0',
        }}
    >
        <Text color={'var(--deep-blue)'} fontWeight={isTotal ? 600 : undefined} fontSize={20}>
            {label}
        </Text>
        <Text color={value && value < 0 ? 'var(--red)' : 'var(--green)'}>
            {value && minusValue(value)}
        </Text>
    </Box>
)
const minusValue = (value: number): string => {
    const formatted = value < 0 ? `(${Math.abs(value).toLocaleString()})` : value.toLocaleString()
    return formatted
}
