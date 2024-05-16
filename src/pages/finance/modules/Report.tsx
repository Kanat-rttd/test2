import { Box, Select, Text } from '@chakra-ui/react'
import styles from '../style.module.css'
import DateRange from '../../../components/DateRange'
// import Drawler from '@/components/Menu'
// import { getReportData } from '@/utils/services/finance.service'
// import useSWR from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'

interface Report {
    initial: number
    defaultData: [
        {
            name: string
            total: number
        },
    ]
    data: {
        operational: {
            total: number
            data: [
                {
                    name: string
                    total: number
                },
            ]
        }
        financial: {
            total: number
            data: [
                {
                    name: string
                    total: number
                },
            ]
        }
    }
    balance: number
    total: number
}

const Report = () => {
    const { getURLs } = useURLParameters()
    
    // const { data } = useSWR<Report>(['finance/report'], {
    //     fetcher: () => getReportData(),
    // })
    const { data } = useApi<Report>(`finance/report?${getURLs().toString()}`)

    const score = [
        {
            label: 'Kaspi',
            value: 1,
        },
    ]

    //TODO: Перепишите бэк если вам на фронте приходится так делать с данными
    const defaultData = data?.defaultData

    const operationalData = data?.data.operational.data
    const operationTotal = data?.data.operational.total

    const financialData = data?.data.financial.data
    const financialTotal = data?.data.financial.total

    const balance = data?.balance
    const total = data?.total

    return (
        <>
           {/* <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                alignItems={'center'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
                height={'60px'}
                p={'0 1rem'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
                </Box>
                <Avatar bg="teal.500" />
            </Box> */}
            <Box className={styles.container}>
                <Box display="flex" gap="10px">
                    <Box className={styles.scoreSelect}>
                        <Select
                        size={'sm'}
                        borderRadius={5}
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
                        <DateRange />
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
                        {defaultData?.map((item, index) => (
                            <Row key={index} label={item.name} value={item.total} />
                        ))}
                        <Row
                            label="Движение средств от операционной деятельности"
                            value={operationTotal}
                            isTotal
                        />
                        {operationalData?.map((item, index) => (
                            <Row key={index} label={item.name} value={item.total} />
                        ))}
                        <Row
                            label="Движение средств от финансовой деятельности"
                            value={financialTotal}
                            isTotal
                        />
                        {financialData?.map((item, index) => (
                            <Row key={index} label={item.name} value={item.total} />
                        ))}
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
