import { Box, Select, Table, Tr, Td, Tbody, Th } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import { TableContainer, Tfoot, Thead } from '@/components/ui'

interface calculationsData {
    Data: [
        {
            ClientName: string
            Sales: number
            Returns: number
            Overhead: number
            Expenses: number
            Payments: number
            Credit: number
            Debt: number
        },
    ]
    Total: number
}

const ProviderTable = () => {
    const { data: calculationsData } = useApi<calculationsData>('debtTransfer/calculations')

    return (
        <>
            <Box width={'25%'} marginBottom={6}>
                <Select placeholder="Реализатор" size={'sm'} borderRadius={5} width={'80%'}>
                    <option>Реализатор</option>
                </Select>
            </Box>
            <Box>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Реализатор</Th>
                                <Th>Сумма долга</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {calculationsData?.Data.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.ClientName}</Td>
                                        <Td>{item.Debt}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th color={'#000'} width={'10%'} fontSize={15}>
                                    ИТОГО
                                </Th>
                                <Th width={'67%'}> </Th>
                                <Th color={'#000'} fontSize={15}>
                                    {calculationsData?.Total}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default ProviderTable
