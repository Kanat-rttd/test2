import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { Box, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react'

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
        <Box width={'100%'}>
            <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
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
                    <Tfoot>
                        <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                            <Td w={'15%'}>
                                ИТОГО
                            </Td>
                            <Td w={'17%'}></Td>
                            <Td w={'25%'}>
                                50000
                            </Td>
                            <Td w={'30%'}>
                                50000
                            </Td>
                            <Td w={'30%'}>
                                5000
                            </Td>
                            <Td> </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PivotTable
