import { Box, Table, Tbody, Tr, Th, Td, Select } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import { useState } from 'react'
import { TableContainer, Tfoot, Thead } from '@/components/ui'

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
    const [selectedProviderId, setSelectedProviderId] = useState<string>('')

    const { data: purchasesData } = useApi<DebtPurchase>('productPurchase/debt', {
        providerId: selectedProviderId,
    })
    const { data: providersData } = useApi<Provider[]>('providers')

    const handleProviderChange = (event: any) => {
        setSelectedProviderId(event.target.value)
    }

    return (
        <>
            <Box padding={5} width={'25%'}>
                <Select
                mb={-4}
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
            <Box padding={5}>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
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
                                    <Tr key={item.providerId}>
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
