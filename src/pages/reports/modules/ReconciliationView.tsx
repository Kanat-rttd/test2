import { useState, useEffect } from 'react'
import {
    BREAD_REPORT_ROUTE,
    RELEASE_REPORT_ROUTE,
    VISIT_REPORT_ROUTE,
    RECONCILIATION_REPORT_ROUTE,
} from '@/utils/constants/routes.consts'
import {
    Avatar,
    Box,
    Button,
    Select,
    TableContainer,
    Td,
    Th,
    Tr,
    Tbody,
    Thead,
    Table,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@/utils/services/axios'
import DateRange from '../../../components/DateRange'
import Drawler from '@/components/Drawler'

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
    const { data: breadViewData } = useApi<breadViewData[]>('reports/bread')
    const { data: clientsData } = useApi<Client[]>('client')
    console.log(breadViewData)
    const navigate = useNavigate()

    const [selectedClient, setSelectedClient] = useState('')

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    useEffect(() => {
        console.log(selectionRange.startDate)
        console.log(selectionRange.endDate)
    }, [selectionRange])

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClient(event.target.value)
    }

    const getProductNames = () => {
        const productNames = new Set<string>()
        breadViewData?.forEach((entry) => {
            entry.Products.forEach((product) => {
                productNames.add(product.productName)
            })
        })
        return [...productNames]
    }

    const filteredData = breadViewData
        ?.map((entry) => ({
            Date: entry.Date,
            Products: entry.Products.filter(
                (product) => selectedClient === '' || product.clientName === selectedClient,
            ),
        }))
        .filter((entry) => entry.Products.length > 0)

    const sumProductQuantityForDate = (date: string, productName: string) => {
        let sum = 0
        filteredData?.forEach((entry) => {
            if (entry.Date === date) {
                entry.Products.forEach((product) => {
                    if (product.productName === productName) {
                        sum += product.quantity
                    }
                })
            }
        })
        return sum
    }

    const productNames = getProductNames()

    return (
        <Box>
            <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(BREAD_REPORT_ROUTE)}
                    >
                        Отчёт по продукции
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(RELEASE_REPORT_ROUTE)}
                    >
                        Отчёт по реализаций
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(VISIT_REPORT_ROUTE)}
                    >
                        Отчёт по посещений
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        bg={'rgba(217, 217, 217, 1)'}
                        onClick={() => navigate(RECONCILIATION_REPORT_ROUTE)}
                    >
                        Акт Сверки
                    </Button>
                </Box>
                <Avatar size={'md'} bg="teal.500" />
            </Box>

            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'100%'}>
                        <DateRange
                            selectionRange={selectionRange}
                            setSelectionRange={setSelectionRange}
                        />
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
                    <TableContainer>
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
