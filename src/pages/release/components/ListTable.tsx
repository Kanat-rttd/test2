import Dialog from '@/components/Dialog'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import EditModal from './EditModal'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useApi } from '@/utils/services/axios'

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
    facilityUnit: string
    status: string
    dateRange: {
        startDate: Date
        endDate: Date
    }
}

export default function ListTable({ facilityUnit, dateRange, status }: ListTableProps) {
    console.log(status)
    const { isOpen, onOpen, onClose } = useDisclosure()

    // const { data: dispatchesData } = useApi<Dispatch[]>('release')

    const [selectedData, setSelectedData] = useState<Dispatch>()

    const { data: dispatchesData } = useApi<Dispatch[]>('release', {
        startDate: String(dateRange?.startDate),
        endDate: String(dateRange?.endDate),
        facilityUnit: facilityUnit,
    })

    console.log(dispatchesData)

    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    return (
        <>
            <TableContainer height={'100%'} overflowY={'auto'}>
                <Table height={'100%'} variant="simple">
                    <Thead>
                        <Tr top={0} position={'sticky'} backgroundColor={'white'}>
                            <Th>№</Th>
                            <Th>Реализатор</Th>
                            <Th>Виды хлеба</Th>
                            <Th>Количество </Th>
                            <Th>Дата и время</Th>
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dispatchesData?.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    <Td>{row.id}</Td>
                                    <Td>{row.client.name}</Td>
                                    <Td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {row.goodsDispatchDetails.map((details, index) => (
                                                <span key={index}>{details.product?.name}</span>
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
                                                onClick={() => {
                                                    setSelectedData(row)
                                                    setModal({ ...modal, isOpen: true })
                                                }}
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
            <EditModal data={selectedData} isOpen={modal.isOpen} onClose={modal.onClose} />
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

// export default ListTable
