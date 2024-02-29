import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'

const PivotTable = () => {
    const data = [
        {
            id: 1,
            item: 'Мука',
            qty: '50кг',
            deliveryCost: 200,
            totalSum: 6200,
        },
        {
            id: 2,
            item: 'Маечки',
            qty: '25 рулон',
            deliveryCost: 400,
            totalSum: 5400,
        },
    ]

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>№</Th>
                        <Th>Товар</Th>
                        <Th>Количество</Th>
                        <Th>Сумма доставки</Th>
                        <Th>Сумма</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((purchase) => {
                        return (
                            <Tr key={purchase.id}>
                                <Td>{purchase.id}</Td>
                                <Td>{purchase.item}</Td>
                                <Td>{purchase.qty}</Td>
                                <Td>{purchase.deliveryCost}</Td>
                                <Td>{purchase.totalSum}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
                <Tfoot marginTop={10}>
                    <Tr>
                        <Th color={'#000'} fontSize={15}>
                            ИТОГО
                        </Th>
                        <Th></Th>
                        <Th color={'#000'} fontSize={15}>
                            50000
                        </Th>
                        <Th color={'#000'} fontSize={15}>
                            50000
                        </Th>
                        <Th color={'#000'} fontSize={15}>
                            5000
                        </Th>
                        <Th> </Th>
                        <Th> </Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default PivotTable
