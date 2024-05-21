import Dialog from '@/components/Dialog'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Td, Th, Tr, useDisclosure } from '@chakra-ui/react'
import EditModal from './EditModal'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useApi } from '@/utils/services/axios'
import { TableContainer, Thead } from '@/components/ui'

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

interface shiftAccounting {
    id: number
    date: Date
    bakingFacilityUnitId: number
    shiftAccountingDetails: [
        {
            id: number
            shiftAccountingId: number
            departPersonalId: number
            shiftTime: number
            departPersonal: {
                id: number
                name: string
            }
        },
    ]
    bakingFacilityUnit: {
        id: number
        facilityUnit: string
    }
}

// interface ListTableProps {
//     status: string
// }

export default function ListTable({ status }: any) {
    console.log(status)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: shiftAccounting } = useApi<shiftAccounting[]>('shiftAccounting')
    const { data: dispatchesData } = useApi<Dispatch[]>('release')

    console.log(dispatchesData)

    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    return (
        <>
            <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Дата</Th>
                            <Th>Цех</Th>
                            <Th>Сотрудник </Th>
                            <Th>Кол-во часов</Th>
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {shiftAccounting?.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    <Td>{row.id}</Td>
                                    <Td>{dayjs(row.date).format('DD.MM.YYYY')}</Td>
                                    <Td>{row.bakingFacilityUnit.facilityUnit}</Td>
                                    <Td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {row.shiftAccountingDetails.map((details) => (
                                                <span key={details.id}>
                                                    {details.departPersonal.name}
                                                </span>
                                            ))}
                                        </div>
                                    </Td>
                                    <Td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {row.shiftAccountingDetails.map((details) => (
                                                <span key={details.id}>{details.shiftTime}</span>
                                            ))}
                                        </div>
                                    </Td>
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

// export default ListTable
