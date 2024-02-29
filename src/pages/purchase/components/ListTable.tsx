import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

const ListTable = () => {
    const data = [
        {
            id: 1,
            date: '2024-02-28',
            provider: 'Рынок',
            item: 'Яйца',
            qty: '50кг',
            price: 5000,
            deliveryPrice: 2000,
            totalSum: 500000,
            status: 'Оплачено',
        },
    ]

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>№</Th>
                        <Th>Дата</Th>
                        <Th>Поставщик</Th>
                        <Th>Товар</Th>
                        <Th>Количество</Th>
                        <Th>Цена</Th>
                        <Th>Сумма</Th>
                        <Th>Сумма доставки</Th>
                        <Th>Статус</Th>
                        <Th>Действия</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((purchase) => {
                        return (
                            <Tr key={purchase.id}>
                                <Td>{purchase.id}</Td>
                                <Td>{purchase.date}</Td>
                                <Td>{purchase.provider}</Td>
                                <Td>{purchase.item}</Td>
                                <Td>{purchase.qty}</Td>
                                <Td>{purchase.price}</Td>
                                <Td>{purchase.deliveryPrice}</Td>
                                <Td>{purchase.totalSum}</Td>
                                <Td>{purchase.status}</Td>
                                <Td>
                                    <EditIcon boxSize={5} cursor={'pointer'} />
                                    <DeleteIcon color={'red'} boxSize={5} cursor={'pointer'} />
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
                <Tfoot marginTop={10}>
                    <Tr>
                        <Th>ИТОГО</Th>
                        <Th> </Th>
                        <Th> </Th>
                        <Th> </Th>
                        <Th>50000</Th>
                        <Th> </Th>
                        <Th>50000</Th>
                        <Th>5000</Th>
                        <Th> </Th>
                        <Th> </Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default ListTable
