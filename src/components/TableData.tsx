import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'

interface OrderArray {
    id: number
    userId: string
    totalPrice: string
    createdAt: Date
    done: number
    orderDetails: [
        {
            orderDetailsId: string
            productId: string
            orderedQuantity: string
            product: {
                bakingFacilityUnit: {
                    id: string
                    facilityUnit: string
                }
                name: string
                price: string
            }
        },
    ]
    user: {
        id: string
        name: string
    }
}

const styles = {
    fontSize: '15px',
    borderBottom: '1px solid black',
    textAlign: 'center',
    fontWeight: 'bold',
}

const TableData = ({ data }: { data: OrderArray[] }) => {
    console.log(data)
    const uniqProducts = new Set<string>()
    data.forEach((order) => {
        order.orderDetails.forEach((detail) => {
            uniqProducts.add(detail.product.name)
        })
    })

    // const getColumnTotal = (productName: string) => {
    //     return data.reduce((total, item) => {
    //         const product = item.products.find((product) => product.productName === productName)
    //         return total + (product?.quantity || 0)
    //     }, 0)
    // }

    return (
        <TableContainer>
            <Table
                size="sm"
                variant="unstyled"
                overflow={'scroll'}
                style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
            >
                <Thead>
                    <Tr>
                        <Th borderBottom={'1px solid black'} fontSize={'15px'}>
                            Реализаторы
                        </Th>
                        {Array.from(uniqProducts).map((name, index) => (
                            <Th sx={styles} key={index}>
                                {name}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td
                                width={'80%'}
                                borderBottom={'1px solid black'}
                                fontSize={'15px'}
                                fontWeight={'bold'}
                            >
                                {item.user.name}
                            </Td>
                            {Array.from(uniqProducts).map((productName, productIndex) => (
                                <Td sx={styles} key={productIndex}>
                                    {item.orderDetails.find(
                                        (prod) => prod.product.name === productName,
                                    )?.orderedQuantity || ''}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Td width={'80%'}>Итого</Td>
                        {/* {Array.from(uniqProducts).map((productName, productIndex) => (
                            <Td key={productIndex}>{getColumnTotal(productName)}</Td>
                        ))} */}
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default TableData
