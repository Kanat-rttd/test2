import { useState } from 'react'
import { Box, Select, Th, Tr, Tbody, Table } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import DateRange from '../../../components/DateRange'
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
    const { data: reconciliationViewData } = useApi<breadViewData[]>(`reports/reconciliation?${getURLs().toString()}`)
    const { data: clientsData } = useApi<Client[]>('client')
    console.log(reconciliationViewData)

    const [selectedClient, setSelectedClient] = useState('')

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClient(event.target.value)
    }

    return (
        <Box>
            <Box width={'100%'} height={'100%'} p={5} mt={1}>
                <Box marginBottom={6} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'100%'}>
                        <DateRange />
                        <Select
                        size={'sm'}
                        borderRadius={5}
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
