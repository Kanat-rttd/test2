import { Box, Icon, Text, Tooltip } from '@chakra-ui/react'
import styles from '../style.module.css'
import DateRange from '../../../components/DateRange'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { useEffect } from 'react'
import { QuestionIcon } from '@chakra-ui/icons'

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
    // const balance = financeData?.balance
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
                    <Row
                        label='ОСТАТОК НА НАЧАЛО'
                        description='Это сумма, которая была на счету компании на начало отчетного периода. Начальный остаток средств.'
                        value={initial ?? 0}
                    />
                    <Row
                        label='Движение средств от операционной деятельности'
                        description='Поступления или оттоки денежных средств, связанные с основной деятельностью компании, такой как продажа продуктов, выплаты заработной платы и т.д.'
                        value={operational ?? 0}
                        isTotal
                    />
                    <Row
                        label='Движение средств от финансовой деятельности'
                        description='Денежные потоки, связанные с привлечением или возвратом финансовых средств, например, кредиты, выплаты процентов по займам или инвестирования.'
                        value={financial ?? 0}
                        isTotal
                    />
                    {/*<Row label='Баланс переводов' value={balance ?? 0} />*/}
                    <Row
                        label='ОСТАТОК НА КОНЕЦ'
                        description='Это итоговая сумма денежных средств на конец отчетного периода после учета всех операций.'
                        value={total ?? 0}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Report

const Row = ({
    label,
    description,
    value,
    isTotal,
}: {
    label: string
    description?: string
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
        <Box display='flex' alignItems='center' gap='10px'>
            <Text color='var(--deep-blue)' fontWeight={isTotal ? 600 : undefined} fontSize={20}>
                {label}
            </Text>
            {description && (
                <Tooltip label={description} aria-label='description'>
                    <Icon fontSize='14px' as={QuestionIcon} />
                </Tooltip>
            )}
        </Box>
        <Text color={value && value < 0 ? 'var(--red)' : 'var(--green)'}>
            {value && minusValue(value)}
        </Text>
    </Box>
)
const minusValue = (value: number): string => {
    // return value < 0 ? `(${Math.abs(value).toLocaleString()})` : value.toLocaleString()
    return value.toLocaleString()
}
