import { Table, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { TableContainer, Tfoot, Thead } from './ui'
import { OrderArrayType } from '@/utils/types/order.types'

const TableData = ({ data }: { data: OrderArrayType[] | undefined }) => {
    const uniqProducts = new Set<string>()
    data?.forEach((order) => {
        order.orderDetails.forEach((detail) => {
            uniqProducts.add(detail.product.name)
        })
    })

    const getColumnTotal = (productName: string) => {
        return data?.reduce((total, item) => {
            const product = item.orderDetails.find(
                (product) => product.product.name === productName,
            )
            return total + (Number(product?.orderedQuantity) || 0)
        }, 0)
    }

    return (
        <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>№</Th>
                        <Th>Реализаторы</Th>
                        {Array.from(uniqProducts).map((name, index) => (
                            <Th textAlign={'center'} minW={'100px'} key={index}>
                                {name}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((item, index) => (
                        <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{item.client.name}</Td>
                            {Array.from(uniqProducts).map((productName, productIndex) => (
                                <Td width={'160px'} textAlign={'center'} key={productIndex}>
                                    {item.orderDetails.find(
                                        (prod) => prod.product.name === productName,
                                    )?.orderedQuantity || ''}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr display={'flex'} justifyContent={'space-between'} mr={'1rem'}>
                        <Th fontSize={16} fontWeight={'bold'} color={'#000'}>
                            Итого
                        </Th>
                        <Tr
                            width={'72%'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            mr={'32px'}
                            gap={'10%'}
                        >
                            {Array.from(uniqProducts).map((productName, productIndex) => (
                                <Th
                                w={'160px'}
                                    key={productIndex}
                                    fontSize={16}
                                    fontWeight={'bold'}
                                    color={'#000'}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    textAlign={'center'}
                                >
                                    {getColumnTotal(productName)}
                                </Th>
                            ))}
                        </Tr>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default TableData
