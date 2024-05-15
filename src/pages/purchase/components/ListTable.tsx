import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from './EditModal'
// import { getAllPruchases } from '@/utils/services/productPurchase.service'
import dayjs from 'dayjs'
// import useSWR, { mutate } from 'swr'
import { useApi } from '@/utils/services/axios'
import { mutate } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'

interface AllPurchases {
    purchases: Purchase[]
    totalQuantity: number
    totalSum: number
    totalDeliverySum: number
}

interface Purchase {
    id: number
    date: Date
    providerId: number
    rawMaterialId: number
    quantity: number
    price: number
    deliverySum: number
    totalSum: number
    status: string
    provider: {
        id: number
        name: string
    }
    rawMaterial: {
        id: number
        name: string
    }
}

const ListTable = () => {
    const { getURLs, getParam } = useURLParameters()
    // const { data: purchasesData } = useSWR<AllPurchases>('productPurchase', {
    //     fetcher: () => getAllPruchases(),
    // })

    const { data: purchasesData } = useApi<AllPurchases>(`productPurchase?${getURLs().toString()}`)

    console.log(purchasesData)

    const filteredPurchases = purchasesData?.purchases.filter((purchase) => {
        console.log(purchase.provider.id)
        if (getParam('providerId') && Number(getParam('providerId')) !== purchase.provider.id) {
            return false
        }
        return true
    })
    console.log(filteredPurchases)

    const [selectedData, setSelectedData] = useState<Purchase>()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSelected = (data: Purchase) => {
        setSelectedData(data)
        onOpen()
    }

    const handleUpdateProduct = () => {
        console.log('mutate')
        mutate('productPurchase')
    }

    return (
        <>
            <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
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
                        {filteredPurchases?.map((purchase) => {
                            // Здесь используйте filteredPurchases
                            return (
                                <Tr key={purchase.id}>
                                    <Td>{purchase.id}</Td>
                                    <Td>{dayjs(purchase.date).format('DD.MM.YYYY')}</Td>
                                    <Td>{purchase.provider.name}</Td>
                                    <Td>{purchase.rawMaterial.name}</Td>
                                    <Td>{purchase.quantity}</Td>
                                    <Td>{purchase.price}</Td>
                                    <Td>{purchase.totalSum}</Td>
                                    <Td>{purchase.deliverySum}</Td>
                                    <Td>{purchase.status}</Td>
                                    <Td>
                                        <EditIcon
                                            onClick={() => {
                                                console.log(purchase)
                                                handleSelected(purchase)
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
                    <Tfoot marginTop={10} position={'sticky'} bottom={0} backgroundColor={'white'}>
                        <Tr>
                            <Th color={'#000'} fontSize={15}>
                                ИТОГО
                            </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th color={'#000'} fontSize={15}>
                                {purchasesData?.totalQuantity}
                            </Th>
                            <Th> </Th>
                            <Th color={'#000'} fontSize={15}>
                                {purchasesData?.totalSum}
                            </Th>
                            <Th color={'#000'} fontSize={15}>
                                {purchasesData?.totalDeliverySum}
                            </Th>
                            <Th> </Th>
                            <Th> </Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <EditModal
                selectedData={selectedData}
                isOpen={isOpen}
                onClose={onClose}
                onSuccess={handleUpdateProduct}
            />
        </>
    )
}

export default ListTable
