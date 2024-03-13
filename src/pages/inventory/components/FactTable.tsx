import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

const FactTable = () => {
    const data = {
        table: [
            {
                id: 1,
                items: 'Мука',
                units: 'Шт.',
                qtyFact: 988,
                date: '14:20 15.02.2024',
            },
            {
                id: 2,
                items: 'Соль',
                units: 'Шт.',
                qtyFact: 470,
                date: '14:20 15.02.2024',
            },
        ],
        totalFact: 1500,
    }

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Товары</Th>
                            <Th>Единица измерения</Th>
                            <Th>Количество фактическое</Th>
                            <Th>Время изменения</Th>
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.table.map((item) => {
                            return (
                                <Tr key={item.id}>
                                    <Td>{item.id}</Td>
                                    <Td>{item.items}</Td>
                                    <Td>{item.units}</Td>
                                    <Td>{item.qtyFact}</Td>
                                    <Td>{item.date}</Td>
                                    <Td>
                                        <EditIcon cursor={'pointer'} boxSize={5} />
                                        <DeleteIcon cursor={'pointer'} boxSize={5} color={'red'} />
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th fontSize={15} color={'#000'}>
                                ИТОГО
                            </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th fontSize={15} color={'#000'}>
                                {data.totalFact}
                            </Th>
                            <Th></Th>
                            <Th></Th>
                            <Th> </Th>
                            <Th> </Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    )
}

export default FactTable
