import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

const ListTable = () => {
    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Реализатор</Th>
                            <Th>Виды хлеба</Th>
                            <Th>Количество </Th>
                            <Th>Дата и время</Th>
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>Алишер</Td>
                            <Td>Итальянский</Td>
                            <Td>20</Td>
                            <Td>14:20 15.02.2024</Td>
                            <Td display={'flex'} gap={'10px'}>
                                <EditIcon boxSize={'1.5em'} cursor={'pointer'} />
                                <DeleteIcon boxSize={'1.5em'} color={'red'} cursor={'pointer'} />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ListTable
