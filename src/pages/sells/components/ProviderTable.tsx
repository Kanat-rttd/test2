import {
    Box,
    Select,
    Table,
    Tr,
    Td,
    Thead,
    Tbody,
    Th,
    TableContainer,
    Tfoot,
} from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'

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
    console.log(calculationsData)

    return (
        <>
            <Box width={'25%'} marginBottom={10}>
                <Select placeholder="Реализатор">
                    <option>Реализатор</option>
                </Select>
            </Box>
            <Box>
                <TableContainer>
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
                                        <Td>{index}</Td>
                                        <Td>{item.ClientName}</Td>
                                        <Td>{item.Debt}</Td>
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
