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
} from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from './EditModal'
import { mutate } from 'swr'
import { useApi } from '@/utils/services/axios'

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
    // const [data, setData] = useState<Dispatch[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedRow, setSelectedRow] = useState<Dispatch | null>(null)

    console.log('facilityUnit', dateRange)

    const { data: dispatchData } = useApi<Dispatch[]>('release', {
        facilityUnit,
        client,
        product,
        startDate: String(dateRange?.startDate),
        endDate: String(dateRange?.endDate),
    })
    console.log(dispatchData)

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
        mutate(
            `release?facilityUnit=${facilityUnit}&client=${client}&product=${product}&startDate=${String(
                dateRange?.startDate,
            )}&endDate=${String(dateRange?.endDate)}`,
        )
    }

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Реализатор</Th>
                            <Th>Продукт</Th>
                            <Th>Количество </Th>
                            <Th>Цена</Th>
                            <Th>Сумма</Th>
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dispatchData
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
                                            {
                                                <EditIcon
                                                    boxSize={'1.5em'}
                                                    cursor={'pointer'}
                                                    onClick={() => handleEditClick(row)}
                                                />
                                            }
                                            {
                                                <DeleteIcon
                                                    boxSize={'1.5em'}
                                                    color={'red'}
                                                    cursor={'pointer'}
                                                    onClick={onOpen}
                                                />
                                            }
                                        </Td>
                                    </Tr>
                                )
                            })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
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
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={onClose}
                actionText="Удалить"
            />
        </>
    )
}

export default ListTable
