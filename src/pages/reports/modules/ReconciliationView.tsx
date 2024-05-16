import { useState } from 'react'
import {
    BREAD_REPORT_ROUTE,
    RELEASE_REPORT_ROUTE,
    VISIT_REPORT_ROUTE,
    RECONCILIATION_REPORT_ROUTE,
} from '@/utils/constants/routes.consts'
import { Box, Button, Select, Th, Tr, Tbody, Table } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@/utils/services/axios'
import DateRange from '../../../components/DateRange'
import Header from '@/components/layout/Header'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Thead } from '@/components/ui'

interface breadViewData {
    Date: string
    Products: {
        quantity: number
        clientName: string
        productName: string
    }[]
}

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

const ReconciliationView = () => {
    const { getURLs } = useURLParameters()
    const { data: breadViewData } = useApi<breadViewData[]>(`reports/bread?${getURLs().toString()}`)
    const { data: clientsData } = useApi<Client[]>('client')
    console.log(breadViewData)
    const navigate = useNavigate()

    const [selectedClient, setSelectedClient] = useState('')

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClient(event.target.value)
    }

    return (
        <Box>
            <Header>
                <Button height={'100%'} width={'25%'} onClick={() => navigate(BREAD_REPORT_ROUTE)}>
                    Отчёт по продукции
                </Button>
                <Button
                    height={'100%'}
                    width={'25%'}
                    onClick={() => navigate(RELEASE_REPORT_ROUTE)}
                >
                    Отчёт по реализаций
                </Button>
                <Button height={'100%'} width={'25%'} onClick={() => navigate(VISIT_REPORT_ROUTE)}>
                    Отчёт по посещений
                </Button>
                <Button
                    height={'100%'}
                    width={'15%'}
                    bg={'rgba(217, 217, 217, 1)'}
                    onClick={() => navigate(RECONCILIATION_REPORT_ROUTE)}
                >
                    Акт Сверки
                </Button>
            </Header>

            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'100%'}>
                        <DateRange />
                        <Select
                            width={'fit-content'}
                            value={selectedClient}
                            onChange={handleClientChange}
                        >
                            <option value="">Все клиенты</option>
                            {clientsData?.map((client) => (
                                <option key={client.id} value={client.name}>
                                    {client.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Box>
                <Box>
                    <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Дата</Th>
                                    <Th>Продажи</Th>
                                    <Th>Оплата за услуги</Th>
                                    <Th>Перевод долга</Th>
                                    <Th>Выплата</Th>
                                    <Th>Сверху</Th>
                                    <Th>Долг</Th>
                                </Tr>
                            </Thead>
                            <Tbody></Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default ReconciliationView
