import { Table, Tr, Th, Tbody, Td, Box, Select } from '@chakra-ui/react'
import { TableContainer, Thead } from '@/components/ui'

const data = [
    {
        id: 1,
        name: 'Мука',
        remainOnTheBeginning: 100,
        expense: 500,
        arrival: 500,
        remainOnTheEnd: 100,
    },
    {
        id: 2,
        name: 'Картошка',
        remainOnTheBeginning: 100,
        expense: 500,
        arrival: 500,
        remainOnTheEnd: 100,
    },
]

const RemainRawMaterials = () => {
    return (
        <>
            <Box display="flex" flexDirection="column" p={5} minHeight="100vh">
                <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select placeholder="Название" width={'fit-content'} name="status">
                            <option value="1">Активен</option>
                            <option value="0">Приостановлен</option>
                        </Select>
                    </Box>
                </Box>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Название</Th>
                                <Th>Остаток на начало</Th>
                                <Th>Расход</Th>
                                <Th>Приход</Th>
                                <Th>Остаток на конец</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((product, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{product.id}</Td>
                                        <Td>{product.name}</Td>
                                        <Td>{product.remainOnTheBeginning}</Td>
                                        <Td>{product.expense}</Td>
                                        <Td>{product.arrival}</Td>
                                        <Td>{product.remainOnTheEnd}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Box>
                    <TableContainer maxWidth={'100%'} width={'100%'}>
                        <Table variant="simple">
                            <Tbody>
                                <Tr>
                                    <Td></Td>
                                    <Td>Итого</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default RemainRawMaterials
