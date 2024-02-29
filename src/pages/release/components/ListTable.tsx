import Dialog from '@/components/Dialog'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import EditModal from './EditModal'
import { useState, useEffect } from 'react'
import { getAllDispatches } from '@/utils/services/dispatch.service'
import dayjs from 'dayjs'

interface Dispatch {
    id: number
    clientId: number
    createdAt: Date
    dispatch: string
    goodsDispatchDetails: [
        {
            id: number
            productId: number
            quantity: number
            product: {
                name: string
                price: number
                bakingFacilityUnit: {
                    id: number
                    facilityUnit: string
                }
            }
        },
    ]
    client: {
        id: number
        name: string
    }
}

interface ListTableProps {
    status: string
}

const ListTable: React.FC<ListTableProps> = ({ status }) => {
    console.log(status)
    console.log(status)
    const [data, setData] = useState<Dispatch[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Реализатор</Th>
                            <Th>Виды хлеба</Th>
                            <Th>Количество </Th>
                            <Th>Дата и время</Th>
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
                                    <Td>{dayjs(row.createdAt).format('HH:MM DD.MM.YYYY')}</Td>
                                    <Td style={{ display: 'flex', gap: '10px' }}>
                                        {
                                            <EditIcon
                                                boxSize={'1.5em'}
                                                cursor={'pointer'}
                                                onClick={() => setModal({ ...modal, isOpen: true })}
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
                </Table>
            </TableContainer>
            <EditModal isOpen={modal.isOpen} onClose={modal.onClose} />
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
