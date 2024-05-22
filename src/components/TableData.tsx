import { Table, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { TableContainer, Tfoot, Thead } from './ui'

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
            product: ProductType
        },
    ]
    user: {
        id: string
        name: string
    }
}

type ProductType = {
    bakingFacilityUnit: {
        id: string
        facilityUnit: string
    }
    name: string
    price: string
}

const TableData = ({ data }: { data: OrderArray[] | undefined }) => {
    console.log(data)
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
                        <Th> Реализаторы</Th>
                        {Array.from(uniqProducts).map((name, index) => (
                            <Th textAlign={'center'} key={index}>
                                {name}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.user.name}</Td>
                            {Array.from(uniqProducts).map((productName, productIndex) => (
                                <Td width={'20%'} textAlign={'center'} key={productIndex}>
                                    {item.orderDetails.find(
                                        (prod) => prod.product.name === productName,
                                    )?.orderedQuantity || ''}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr display={'flex'} justifyContent={'space-between'}>
                        <Th fontSize={15} color={'#000'} width={'19%'}>
                            Итого
                        </Th>
                        {Array.from(uniqProducts).map((productName, productIndex) => (
                            <Th
                                fontSize={15}
                                color={'#000'}
                                width={'21%'}
                                textAlign={'center'}
                                key={productIndex}
                            >
                                {getColumnTotal(productName)}
                            </Th>
                        ))}
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default TableData
