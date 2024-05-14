import Dialog from '@/components/Dialog'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Tfoot,
    Box,
    IconButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from './EditModal'
import { mutate } from 'swr'
import { useApi } from '@/utils/services/axios'
import { deleteDispatch } from '@/utils/services/dispatch.service'
import { useNotify } from '@/utils/providers/ToastProvider'

interface DispatchData {
    data: Dispatch[]
    totalPrice: number
    totalQuantity: number
}

interface Dispatch {
    id: number
    clientId: number
    createdAt: string
    dispatch: string
    goodsDispatchDetails: {
        id: number
        productId: number
        quantity: number
        price: string
        product: {
            name: string
            price: number
            bakingFacilityUnit: {
                id: number
                facilityUnit: string
            }
        }
    }[]
    client: {
        id: number
        name: string
    }
}

interface ListTableProps {
    facilityUnit: string
    client: string
    product: string
    dateRange: {
        startDate: Date
        endDate: Date
    }
    status: string
}

const ListTable: React.FC<ListTableProps> = ({
    facilityUnit,
    client,
    product,
    dateRange,
    status,
}) => {
    const { loading } = useNotify()
    // const [data, setData] = useState<Dispatch[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedRow, setSelectedRow] = useState<Dispatch | null>(null)

    console.log('facilityUnit', dateRange)

    const { data: dispatchData, mutate: mutateDispatchData } = useApi<DispatchData>('release', {
        facilityUnit,
        client,
        product,
        startDate: String(dateRange?.startDate),
        endDate: String(dateRange?.endDate),
    })

    console.log(dispatchData?.data?.filter((row: Dispatch) => row.dispatch == status))

    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    const handleEditClick = (row: Dispatch) => {
        setSelectedRow(row)
        setModal({ ...modal, isOpen: true })
    }

    const handleModalClose = () => {
        setSelectedRow(null)
        setModal({ ...modal, isOpen: false })
    }

    const handleSuccess = () => {
        console.log('handler')
        mutateDispatchData()
    }

    const handlerDeleteUser = () => {
        console.log(selectedRow)
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
            <TableContainer overflowY={'auto'} height={'90%'}>
                <Table variant="simple" width={'100%'}>
                    <Thead>
                        <Tr position={'sticky'} top={0} backgroundColor={'white'}>
                            <Th width={'10%'}>№</Th>
                            <Th width={'20%'}>Реализатор</Th>
                            <Th width={'20%'}>Продукт</Th>
                            <Th width={'10%'}>Количество </Th>
                            <Th width={'10%'}>Цена</Th>
                            <Th width={'10%'}>Сумма</Th>
                            <Th width={'10%'}>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dispatchData?.data
                            ?.filter((row: Dispatch) => row.dispatch == status)
                            ?.map((row, index) => {
                                return (
                                    <Tr key={row.id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{row.client.name}</Td>
                                        <Td>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'column' }}
                                            >
                                                {row.goodsDispatchDetails.map((details, index) => (
                                                    <span key={index}>{details.product.name}</span>
                                                ))}
                                            </div>
                                        </Td>
                                        <Td>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'column' }}
                                            >
                                                {row.goodsDispatchDetails.map((details, index) => (
                                                    <span key={index}>{details.quantity}</span>
                                                ))}
                                            </div>
                                        </Td>
                                        <Td>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'column' }}
                                            >
                                                {row.goodsDispatchDetails.map((details, index) => (
                                                    <span key={index}>
                                                        {details.price !== null
                                                            ? details.price
                                                            : details.product.price}
                                                    </span>
                                                ))}
                                            </div>
                                        </Td>
                                        <Td>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'column' }}
                                            >
                                                {row.goodsDispatchDetails.map((details, index) => (
                                                    <span key={index}>
                                                        {Number(
                                                            details.price !== null
                                                                ? details.price
                                                                : details.product.price,
                                                        ) * Number(details.quantity)}
                                                    </span>
                                                ))}
                                            </div>
                                        </Td>
                                        <Td style={{ display: 'flex', gap: '10px' }}>
                                            <IconButton
                                                variant="outline"
                                                size={'sm'}
                                                colorScheme="teal"
                                                aria-label="Send email"
                                                marginRight={3}
                                                onClick={() => {
                                                    handleEditClick(row)
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
                                                    setSelectedRow(row)
                                                    onOpen()
                                                }}
                                                icon={<DeleteIcon />}
                                            />
                                        </Td>
                                    </Tr>
                                )
                            })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Box bottom={0} position={'absolute'} width={'100%'}>
                <Table variant="simple" width={'100%'}>
                    <Tfoot>
                        <Tr>
                            <Th fontSize={15} color={'#000'} width={'15%'}>
                                ИТОГО
                            </Th>
                            <Th width={'15%'}></Th>
                            <Th width={'15%'}></Th>
                            <Th fontSize={15} color={'#000'} width={'10%'}>
                                {dispatchData?.totalQuantity}
                            </Th>
                            <Th width={'10%'}></Th>
                            <Th fontSize={15} color={'#000'} width={'10%'}>
                                {dispatchData?.totalPrice}
                            </Th>
                            <Th width={'10%'}></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </Box>
            <EditModal
                isOpen={modal.isOpen}
                onClose={handleModalClose}
                selectedRow={selectedRow}
                onSuccess={handleSuccess}
            />
            <Dialog
                isOpen={isOpen}
                onClose={onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={() => {
                    handlerDeleteUser()
                }}
                actionText="Удалить"
            />
        </>
    )
}

export default ListTable
