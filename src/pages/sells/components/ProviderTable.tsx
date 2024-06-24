import { Box, Select, Table, Tr, Td, Tbody, Th } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { useEffect, useState } from 'react'

interface CalculationsData {
    Data: {
        ClientName: string
        Sales: number
        Returns: number
        Overhead: number
        Expenses: number
        Payments: number
        Credit: number
        Debt: number
    }[]
    Total: number
}

const ProviderTable = () => {
    const { data: calculationsData } = useApi<CalculationsData>('debtTransfer/calculations')
    const [filteredData, setFilteredData] = useState<
        | {
              ClientName: string
              Sales: number
              Returns: number
              Overhead: number
              Expenses: number
              Payments: number
              Credit: number
              Debt: number
          }[]
        | undefined
    >([])

    useEffect(() => {
        if (calculationsData) {
            const _filteredData = calculationsData.Data.filter((item) => item.Debt != 0)
            setFilteredData(_filteredData)
        }
    }, [calculationsData])

    return (
        <>
            <Box width={'25%'} marginBottom={4}>
                <Select placeholder="Реализатор" size={'sm'} borderRadius={5} width={'80%'}>
                    <option>Реализатор</option>
                </Select>
            </Box>

            <Box
                style={
                    filteredData && filteredData.length >= 7
                        ? { height: '100dvh' }
                        : {}
                }
            >
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
                            {filteredData?.length ? (
                                filteredData?.map((item, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{item.ClientName}</Td>
                                            <Td>{item.Debt}</Td>
                                        </Tr>
                                    )
                                })
                            ) : (
                                <Tr>
                                    <Td>Нет данных</Td>
                                </Tr>
                            )}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th color={'#000'} fontSize={15}>
                                    ИТОГО
                                </Th>
                                <Th width={'60%'}></Th>
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
