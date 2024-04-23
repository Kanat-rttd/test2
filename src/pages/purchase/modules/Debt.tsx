import Drawler from '@/components/Drawler'
import { PURCHASE_DEBT_ROUTE, PURCHASE_PRODUCTS_ROUTE } from '@/utils/constants/routes.consts'
import {
    Avatar,
    Box,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Select,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@/utils/services/axios'
import { useState } from 'react'

interface Provider {
    id: number
    name: string
}

interface DebtPurchase {
    totalDebt: string
    data: [
        {
            totalDebt: string
            providerId: number
            provider: {
                id: number
                name: string
            }
        },
    ]
}

const Debt = () => {
    const navigate = useNavigate()
    const [selectedProviderId, setSelectedProviderId] = useState<string>('')

    const { data: purchasesData } = useApi<DebtPurchase>('productPurchase/debt', {
        providerId: selectedProviderId,
    })
    const { data: providersData } = useApi<Provider[]>('providers')

    const handleProviderChange = (event: any) => {
        setSelectedProviderId(event.target.value)
    }

    console.log(providersData)

    console.log(purchasesData)

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
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(PURCHASE_PRODUCTS_ROUTE)}
                    >
                        Закуп
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(PURCHASE_DEBT_ROUTE)}
                        background={'rgba(217, 217, 217, 1)'}
                    >
                        Долги по закупу
                    </Button>
                </Box>
                <Avatar bg="teal.500" />
            </Box>

            <Box padding={10} width={'25%'}>
                <Select
                    placeholder="Поставщик"
                    value={selectedProviderId}
                    onChange={handleProviderChange}
                    width={'fit-content'}
                >
                    {providersData?.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                            {provider.name}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box padding={10}>
                <TableContainer
                    height={'100%'}
                    width={'100%'}
                    overflowX={'auto'}
                    overflowY={'auto'}
                    maxHeight={'80dvh'}
                    minHeight={'80dvh'}
                >
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Поставщик</Th>
                                <Th>Сумма долга</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {purchasesData?.data.map((item, index) => {
                                return (
                                    <Tr key={index + 1}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.provider.name}</Td>
                                        <Td>{item.totalDebt}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th color={'#000'} fontSize={15}>
                                    ИТОГО
                                </Th>
                                <Th> </Th>
                                <Th color={'#000'} fontSize={15}>
                                    {purchasesData?.totalDebt}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Debt
