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
import { useState, useEffect } from 'react'
import { getAllDispatches } from '@/utils/services/dispatch.service'
import EditModal from './EditModal'

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
    status: string
}

const ListTable: React.FC<ListTableProps> = ({ status }) => {
    const [data, setData] = useState<Dispatch[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedRow, setSelectedRow] = useState<Dispatch | null>(null)

    useEffect(() => {
        getAllDispatches().then((res) => {
            console.log(res.data)
            setData(res.data.filter((row: Dispatch) => row.dispatch == status))
        })
    }, [])

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
                        {data?.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    <Td>{row.id}</Td>
                                    <Td>{row.client.name}</Td>
                                    <Td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {row.goodsDispatchDetails.map((details, index) => (
                                                <span key={index}>{details.product.name}</span>
                                            ))}
                                        </div>
                                    </Td>
                                    <Td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {row.goodsDispatchDetails.map((details, index) => (
                                                <span key={index}>{details.quantity}</span>
                                            ))}
                                        </div>
                                    </Td>
                                    <Td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {row.goodsDispatchDetails.map((details, index) => (
                                                <span key={index}>{details.price}</span>
                                            ))}
                                        </div>
                                    </Td>
                                    <Td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {row.goodsDispatchDetails.map((details, index) => (
                                                <span key={index}>
                                                    {Number(details.price) *
                                                        Number(details.quantity)}
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
            <EditModal isOpen={modal.isOpen} onClose={handleModalClose} selectedRow={selectedRow} />
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
