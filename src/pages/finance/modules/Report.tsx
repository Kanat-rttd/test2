import { Box, Icon, Text, Tooltip } from '@chakra-ui/react'
import DateRange from '../../../components/DateRange'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { QuestionIcon } from '@chakra-ui/icons'
import IsMobile from '@/utils/helpers/isMobile.ts'

interface Report {
    initial: number
    operational: {
        total: number
        items: {
            amount: number
            comment: ''
            date: Date
            financeCategory: {
                id: number
                name: string
                type: string
            }
        }[]
    }
    financial: {
        total: number
        items: {
            amount: number
            comment: ''
            date: Date
            financeCategory: {
                id: number
                name: string
                type: string
            }
        }[]
    }
    balance: number
    final: number
    total: number
}

const Report = () => {
    const { getURLs } = useURLParameters()

    const { data: financeData } = useApi<Report>(`finance/report?${getURLs().toString()}`)

    const initial = financeData?.initial
    const operational = financeData?.operational
    const financial = financeData?.financial
    const total = financeData?.total

    return (
        <Box display='flex' flexDirection='column' gap='1rem' padding={IsMobile() ? 0 : 5}>
            <Box width='55%' display='flex' gap='10px'>
                <DateRange />
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
                        value={operational?.total ?? 0}
                        isTotal
                    />
                    <Row
                        label='Движение средств от финансовой деятельности'
                        description='Денежные потоки, связанные с привлечением или возвратом финансовых средств, например, кредиты, выплаты процентов по займам или инвестирования.'
                        value={financial?.total ?? 0}
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
