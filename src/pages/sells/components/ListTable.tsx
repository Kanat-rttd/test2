import Dialog from '@/components/Dialog'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Td, Th, Tr, useDisclosure, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from './EditModal'
// import { mutate } from 'swr'
import { useApi } from '@/utils/services/axios'
import { deleteDispatch } from '@/utils/services/dispatch.service'
import { useNotify } from '@/utils/hooks/useNotify'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import dayjs from 'dayjs'

interface DispatchData {
    data: DispatchType[]
    totalPrice: number
    totalQuantity: number
}

interface DispatchType {
    id: number
    contragentId: number
    createdAt: string
    dispatch: string
    goodsDispatchDetails: {
        id: number
        productId: number
        quantity: number
        price: number
        product: {
            name: string
            price: number
            bakingFacilityUnit: {
                id: number
                facilityUnit: string
            }
        }
    }[]
    contragent: {
        id: number
        contragentName: string
    }
}

const ListTable: React.FC = () => {
    const { getURLs } = useURLParameters()
    const { loading } = useNotify()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedRow, setSelectedRow] = useState<DispatchType | null>(null)

    const { data: dispatchData, mutate: mutateDispatchData } = useApi<DispatchData>(
        `release?${getURLs().toString()}&status=0`,
    )

    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    const handleEditClick = (row: DispatchType) => {
        setSelectedRow(row)
        setModal({ ...modal, isOpen: true })
    }

    const handleModalClose = () => {
        setSelectedRow(null)
        setModal({ ...modal, isOpen: false })
    }

    const handleSuccess = () => {
        mutateDispatchData()
    }

    const handlerDeleteUser = () => {
        if (selectedRow) {
            const responsePromise: Promise<any> = deleteDispatch(selectedRow.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutateDispatchData()
                onClose()
            })
        } else {
            console.error('No user data available to delete.')
        }
    }

    return (
        <>
            <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <Table variant='simple' width='100%'>
                    <Thead>
                        <Tr position='sticky' top={0} backgroundColor='white' zIndex={9}>
                            <Th textAlign='center'>№</Th>
                            <Th textAlign='center'>Дата</Th>
                            <Th>Реализатор</Th>
                            <Th>Продукт</Th>
                            <Th>Количество </Th>
                            <Th>Цена</Th>
                            <Th>Сумма</Th>
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dispatchData?.data.length ? (
                            dispatchData?.data
                                ?.filter((row: DispatchType) => row.dispatch == status)
                                ?.map((row, index) => {
                                    return (
                                        <Tr textAlign='center' key={row.id}>
                                            <Td textAlign='center'>{index + 1}</Td>
                                            <Td textAlign='center'>
                                                {dayjs(row.createdAt).format('HH:mm DD.MM.YYYY')}
                                            </Td>
                                            <Td>{row.contragent.contragentName}</Td>
                                            <Td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    {row.goodsDispatchDetails.map((details) => (
                                                        <span key={details.id}>
                                                            {details.product.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </Td>
                                            <Td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    {row.goodsDispatchDetails.map(
                                                        (details, index) => (
                                                            <span key={index}>
                                                                {details.quantity}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </Td>
                                            <Td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    {row.goodsDispatchDetails.map(
                                                        (details, index) => (
                                                            <span key={index}>{details.price}</span>
                                                        ),
                                                    )}
                                                </div>
                                            </Td>
                                            <Td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    {row.goodsDispatchDetails.map(
                                                        (details, index) => (
                                                            <span key={index}>
                                                                {Number(details.price) *
                                                                    Number(details.quantity)}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </Td>
                                            <Td>
                                                <IconButton
                                                    variant='outline'
                                                    size='sm'
                                                    colorScheme='teal'
                                                    aria-label='Send email'
                                                    marginRight={3}
                                                    onClick={() => {
                                                        handleEditClick(row)
                                                    }}
                                                    icon={<EditIcon />}
                                                />
                                                <IconButton
                                                    variant='outline'
                                                    size='sm'
                                                    colorScheme='teal'
                                                    aria-label='Send email'
                                                    marginRight={3}
                                                    onClick={() => {
                                                        setSelectedRow(row)
                                                        onOpen()
                                                    }}
                                                    icon={<DeleteIcon />}
                                                />
                                            </Td>
                                        </Tr>
                                    )
                                })
                        ) : (
                            <Tr>
                                <Th>Нет данных</Th>
                            </Tr>
                        )}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th fontSize={15} color='#000'>
                                ИТОГО
                            </Th>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                            <Th fontSize={15} color='#000'>
                                {dispatchData?.totalQuantity}
                            </Th>
                            <Th></Th>
                            <Th fontSize={15} color='#000'>
                                {dispatchData?.totalPrice}
                            </Th>
                            <Th></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <EditModal
                isOpen={modal.isOpen}
                onClose={handleModalClose}
                selectedRow={selectedRow}
                onSuccess={handleSuccess}
            />
            <Dialog
                isOpen={isOpen}
                onClose={onClose}
                header='Удалить'
                body='Вы уверены? Вы не сможете отменить это действие впоследствии.'
                actionBtn={() => {
                    handlerDeleteUser()
                }}
                actionText='Удалить'
            />
        </>
    )
}

export default ListTable
