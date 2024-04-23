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

const MagazineTable = () => {
    const data = {
        mainData: [
            {
                id: 1,
                provider: 'My Mart 1',
                debt: 6200,
            },
            {
                id: 2,
                provider: 'My Mart 2',
                debt: 5400,
            },
        ],
        total: 5000,
    }

    return (
        <>
            <Box width={'25%'} marginBottom={10}>
                <Select placeholder="Магазин">
                    <option>Магазин</option>
                </Select>
            </Box>
            <Box>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Магазин</Th>
                                <Th>Сумма долга</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.mainData.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>{item.id}</Td>
                                        <Td>{item.provider}</Td>
                                        <Td>{item.debt}</Td>
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
                                    {data.total}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default MagazineTable
