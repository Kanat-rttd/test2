import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Tr, Th, Td, useDisclosure, Box, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from './EditModal'
import dayjs from 'dayjs'
import { useApi } from '@/utils/services/axios'
import { mutate } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import Dialog from '@/components/Dialog'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deletePurchase } from '@/utils/services/productPurchase.service'
import UniversalComponent from '@/components/ui/UniversalComponent'

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
    providerGood: {
        id: number
        name: string
    }
}

const ListTable = () => {
    const { loading } = useNotify()
    const { getURLs, getParam } = useURLParameters()

    const { data: purchasesData, mutate: mutatePurchaseData } = useApi<AllPurchases>(
        `productPurchase?${getURLs().toString()}`,
    )

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
        mutate('productPurchase')
    }

    const handlerDelete = (selectedData: Purchase | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deletePurchase(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutatePurchaseData()
            })
        } else {
            console.error('No Purchase data available to delete.')
        }
    }

    return (
        <>
            <UniversalComponent>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Box pb={4}>
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
                                    return (
                                        <Tr key={purchase.id}>
                                            <Td>{purchase.id}</Td>
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
                                                    marginRight={3}
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
                        </Table>
                    </Box>
                    <Table variant="simple">
                        <Tfoot>
                            <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                                <Td w={'5%'}>ИТОГО</Td>
                                <Td w={'5%'}> </Td>
                                <Td w={'5%'}> </Td>
                                <Td w={'5%'}> </Td>
                                <Td w={'7%'}> </Td>
                                <Td w={'10%'}>{purchasesData?.totalQuantity}</Td>
                                <Td w={'4%'}> </Td>
                                <Td w={'10%'}>{purchasesData?.totalSum}</Td>
                                <Td w={'9%'}>{purchasesData?.totalDeliverySum}</Td>
                                <Td w={'10%'}> </Td>
                                <Td w={'10%'}> </Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </UniversalComponent>
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
