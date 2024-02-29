import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from './EditModal'

export type PurchaseEdit = {
    provider: string
    raw: string
    qty: number
    price: number
    totalSum: number
    deliverySum: number
    date: string
    status: string
}

const ListTable = () => {
    const data = [
        {
            id: 1,
            date: '2024-02-28',
            provider: 'Поставщик',
            raw: 'Сырье',
            qty: 50,
            price: 5000,
            deliverySum: 2000,
            totalSum: 50000,
            status: 'Оплачено',
        },
    ]

    const [selectedData, setSelectedData] = useState<PurchaseEdit>()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
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
                                    <Td>{purchase.raw}</Td>
                                    <Td>{purchase.qty}</Td>
                                    <Td>{purchase.price}</Td>
                                    <Td>{purchase.deliverySum}</Td>
                                    <Td>{purchase.totalSum}</Td>
                                    <Td>{purchase.status}</Td>
                                    <Td>
                                        <EditIcon
                                            onClick={() => {
                                                setSelectedData(purchase)
                                                onOpen()
                                            }}
                                            boxSize={5}
                                            cursor={'pointer'}
                                        />
                                        <DeleteIcon color={'red'} boxSize={5} cursor={'pointer'} />
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot marginTop={10}>
                        <Tr>
                            <Th color={'#000'} fontSize={15}>
                                ИТОГО
                            </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th color={'#000'} fontSize={15}>
                                50000
                            </Th>
                            <Th> </Th>
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
            <EditModal selectedData={selectedData} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ListTable
