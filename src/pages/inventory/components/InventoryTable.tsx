import { EditIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

const InventoryTable = () => {
    const data = {
        table: [
            {
                id: 1,
                items: 'Мука',
                units: 'Шт.',
                qtyRegister: 1000,
                qtyFact: 988,
                divergence: 12,
                date: '14:20 15.02.2024',
            },
            {
                id: 2,
                items: 'Соль',
                units: 'Шт.',
                qtyRegister: 500,
                qtyFact: 470,
                divergence: 30,
                date: '14:25 15.02.2024',
            },
        ],
        totalRegister: 1500,
        totalFact: 1458,
        divergence: 42,
    }

    console.log(data)

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>№</Th>
                        <Th>Товары</Th>
                        <Th>Единица измерения</Th>
                        <Th>Количество по учету</Th>
                        <Th>Количество фактическое</Th>
                        <Th>Расхождение</Th>
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
                                <Td>{item.qtyRegister}</Td>
                                <Td>{item.qtyFact}</Td>
                                <Td>{item.divergence}</Td>
                                <Td>{item.date}</Td>
                                <Td>
                                    <EditIcon />
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
                            {data.totalRegister}
                        </Th>
                        <Th fontSize={15} color={'#000'}>
                            {data.totalFact}
                        </Th>
                        <Th fontSize={15} color={'#000'}>
                            {' '}
                            {data.divergence}
                        </Th>
                        <Th> </Th>
                        <Th> </Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default InventoryTable
