import { Box, Text } from '@chakra-ui/react'
import styles from '../style.module.css'
import DateRange from '../../../components/DateRange'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { useEffect } from 'react'

interface Report {
    initial: number
    operational: number
    financial: number
    balance: number
    final: number
    total: number
}

const Report = () => {
    const { getURLs } = useURLParameters()

    const { data: financeData } = useApi<Report>(`finance/report?${getURLs().toString()}`)
    // const [data, setData] = useState<Report | undefined>(undefined)

    useEffect(() => {
        if (financeData) {
            // setData(financeData)
        }
    }, [financeData])

    const initial = financeData?.initial
    const operational = financeData?.operational
    const financial = financeData?.financial
    const balance = financeData?.balance
    const total = financeData?.total

    return (
        <Box className={styles.container}>
            <Box display='flex' gap='10px'>
                {/*<Box className={styles.scoreSelect}>*/}
                {/*    <Select*/}
                {/*        size='sm'*/}
                {/*        borderRadius={5}*/}
                {/*        placeholder='Все счета'*/}
                {/*        value={getParam('accountName')}*/}
                {/*        onChange={(e) => setParam('accountName', e.target.value)}*/}
                {/*        width='100%'*/}
                {/*        background='w'*/}
                {/*    >*/}
                {/*        {accounts?.map((account) => (*/}
                {/*            <option key={account.id} value={account.name}>*/}
                {/*                {account.name}*/}
                {/*            </option>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</Box>*/}
                <Box width='20%'>
                    <DateRange />
                </Box>
            </Box>
            <Box w='100%' display='flex' justifyContent='center'>
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
                    <Row label='ОСТАТОК НА НАЧАЛО' value={initial ?? 0} />
                    <Row
                        label='Движение средств от операционной деятельности'
                        value={operational ?? 0}
                        isTotal
                    />
                    <Row
                        label='Движение средств от финансовой деятельности'
                        value={financial ?? 0}
                        isTotal
                    />
                    <Row label='Баланс переводов' value={balance ?? 0} />
                    <Row label='ОСТАТОК НА КОНЕЦ' value={total ?? 0} />
                </Box>
            </Box>
        </Box>
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
        <Text color='var(--deep-blue)' fontWeight={isTotal ? 600 : undefined} fontSize={20}>
            {label}
        </Text>
        <Text color={value && value < 0 ? 'var(--red)' : 'var(--green)'}>
            {value && minusValue(value)}
        </Text>
    </Box>
)
const minusValue = (value: number): string => {
    return value < 0 ? `(${Math.abs(value).toLocaleString()})` : value.toLocaleString()
}
