import { Table, Tr, Th, Tbody, Td, Box, Select } from '@chakra-ui/react'
import { TableContainer, Thead } from '@/components/ui'

const data = [
    {
        id: 1,
        name: 'Мука',
        remainOnTheBeginning: 100,
        baking: 100,
        sells: 100,
        defective: 500,
        remainOnTheEnd: 100,
    },
    {
        id: 1,
        name: 'Картошка',
        remainOnTheBeginning: 100,
        baking: 100,
        sells: 100,
        defective: 500,
        remainOnTheEnd: 100,
    },
]

const RemainProducts = () => {
    return (
        <>
            <Box display="flex" flexDirection="column" p={5}>
                <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select size={'md'} borderRadius={5} placeholder="Название" width={'fit-content'} name="status">
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
                                <Th>Выпечка</Th>
                                <Th>Продажи</Th>
                                <Th>Брак</Th>
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
                                        <Td>{product.baking}</Td>
                                        <Td>{product.sells}</Td>
                                        <Td>{product.defective}</Td>
                                        <Td>{product.remainOnTheEnd}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default RemainProducts
