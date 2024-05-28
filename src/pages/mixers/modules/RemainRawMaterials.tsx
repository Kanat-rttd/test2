import { Table, Tr, Th, Tbody, Td, Box, Select } from '@chakra-ui/react'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'

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
            <UniversalComponent>
                <Box display="flex" flexDirection="column" p={5} mt={1}>
                    <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <Select placeholder="Название" width={'fit-content'} name="status">
                                <option value="1">Активен</option>
                                <option value="0">Приостановлен</option>
                            </Select>
                        </Box>
                    </Box>
                    <TableContainer style={{ width: '100%', overflowY: 'auto' }}>
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
                            <Tfoot>
                                <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                                    <Td>Итого</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
            </UniversalComponent>
        </>
    )
}

export default RemainRawMaterials
