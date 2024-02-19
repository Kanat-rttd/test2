import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import { Order } from '../utils/types/types'
import RevertTh from './ui/RevertTh'

//TODO: Используй константы вместо let если не изменяется
const TableData = ({ data }: { data: Order[] }) => {
    //console.log(data)
    let uniqProducts = new Set<string>()
    data.forEach((order) => {
        //console.log(order)
        order.products.forEach((product) => {
            uniqProducts.add(product.productName)
        })
    })

    const getColumnTotal = (productName: string) => {
        return data.reduce((total, item) => {
            const product = item.products.find((product) => product.productName === productName)
            return total + (product?.quantity || 0)
        }, 0)
    }

    return (
        <TableContainer maxWidth={'100%'} width={'100%'} p={5}>
            <Table variant="striped" colorScheme="teal" size="lg" width={'100%'}>
                <Thead>
                    <Tr>
                        <Th p={0}>Реализаторы</Th>
                        {Array.from(uniqProducts).map((name, index) => (
                            <RevertTh key={index} text={name} />
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td width={'80%'}>{item.name}</Td>
                            {Array.from(uniqProducts).map((productName, productIndex) => (
                                <Td key={productIndex}>
                                    {item.products.find(
                                        (product) => product.productName === productName,
                                    )?.quantity || ''}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Td width={'80%'}>Итого</Td>
                        {Array.from(uniqProducts).map((productName, productIndex) => (
                            <Td key={productIndex}>{getColumnTotal(productName)}</Td>
                        ))}
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default TableData
