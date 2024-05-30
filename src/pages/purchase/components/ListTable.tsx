import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Tr, Th, Td, useDisclosure, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from './EditModal'
import dayjs from 'dayjs'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import Dialog from '@/components/Dialog'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deletePurchase } from '@/utils/services/productPurchase.service'

interface AllPurchases {
    purchases: Purchase[]
    totalQuantity: number
    totalSum: number
    totalDeliverySum: number
}

interface Purchase {
    id: number
    date: string
    providerId: number
    providerGoodId: number
    quantity: number
    price: number
    deliverySum: number
    totalSum: number
    status: string
    provider: {
        id: number
        name: string
    }
    providerGood: {
        id: number
        name: string
        unitOfMeasure: string
    }
}

interface ListTableProps {
    purchasesData: AllPurchases | undefined
    mutate: () => void
}

const ListTable = ({ purchasesData, mutate }: ListTableProps) => {
    const { loading } = useNotify()
    const { getParam } = useURLParameters()

    // const { data: purchasesData, mutate: mutatePurchaseData } = useApi<AllPurchases>(
    //     `productPurchase?${getURLs().toString()}`,
    // )

    const filteredPurchases = purchasesData?.purchases.filter((purchase) => {
        if (getParam('providerId') && Number(getParam('providerId')) !== purchase.provider.id) {
            return false
        }
        return true
    })

    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const [selectedData, setSelectedData] = useState<Purchase>()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSelected = (data: Purchase) => {
        setSelectedData(data)
        onOpen()
    }

    const handleUpdateProduct = () => {
        mutate()
    }

    const handlerDelete = (selectedData: Purchase | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deletePurchase(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutate()
            })
        } else {
            console.error('No Purchase data available to delete.')
        }
    }

    return (
        <>
            <TableContainer style={{ width: '100%', overflowY: 'auto' }}>
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
                        {filteredPurchases?.map((purchase, index) => {
                            return (
                                <Tr key={purchase.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{dayjs(purchase.date).format('DD.MM.YYYY')}</Td>
                                    <Td>{purchase.provider.name}</Td>
                                    <Td>{purchase.providerGood.name}</Td>
                                    <Td>{purchase.quantity}</Td>
                                    <Td>{purchase.price}</Td>
                                    <Td>{purchase.totalSum}</Td>
                                    <Td>{purchase.deliverySum}</Td>
                                    <Td>{purchase.status}</Td>
                                    <Td>
                                        <IconButton
                                            variant="outline"
                                            size={'sm'}
                                            colorScheme="teal"
                                            aria-label="Send email"
                                            marginRight={3}
                                            onClick={() => {
                                                handleSelected(purchase)
                                            }}
                                            icon={<EditIcon />}
                                        />
                                        <IconButton
                                            variant="outline"
                                            size={'sm'}
                                            colorScheme="teal"
                                            aria-label="Send email"
                                            onClick={() => {
                                                setSelectedData(purchase)
                                                setDialog({
                                                    ...dialog,
                                                    isOpen: true,
                                                })
                                            }}
                                            icon={<DeleteIcon />}
                                        />
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th color={'#000'} fontSize={15} fontWeight={'bold'}>
                                ИТОГО
                            </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th color={'#000'} fontSize={15} fontWeight={'bold'}>
                                {purchasesData?.totalQuantity}
                            </Th>
                            <Th color={'#000'} fontSize={15} fontWeight={'bold'}>
                                {purchasesData?.totalSum}
                            </Th>
                            <Th color={'#000'} fontSize={15} fontWeight={'bold'}>
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
            <Dialog
                isOpen={dialog.isOpen}
                onClose={dialog.onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={() => {
                    dialog.onClose()
                    handlerDelete(selectedData)
                }}
                actionText="Удалить"
            />
        </>
    )
}

export default ListTable
