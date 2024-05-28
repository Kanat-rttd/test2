import { Box, Table, Tbody, Tr, Th, Td, Select } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

interface Provider {
    value: number
    label: string
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
    const { getParam, setParam, getURLs } = useURLParameters()

    const { data: purchasesData } = useApi<DebtPurchase>(
        `productPurchase/debt?${getURLs().toString()}`,
    )
    const { data: providersData } = useApi<Provider[]>('providers')

    return (
        <>
            <Box padding={5} width={'20%'}>
                <Select
                    mt={1}
                    w={'100%'}
                    size={'sm'}
                    borderRadius={5}
                    placeholder="Поставщик"
                    value={getParam('providerId')}
                    onChange={(event) => setParam('providerId', event.target.value)}
                >
                    {providersData?.map((provider, index) => (
                        <option key={`${index}`} value={provider.value}>
                            {provider.label}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box padding={'10px 20px'}>
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
                                <Th width={'77%'}> </Th>
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
