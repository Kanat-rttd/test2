import Dialog from '@/components/Dialog'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconButton, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react'
import EditModal from './EditModal'
import { useState } from 'react'
import dayjs from 'dayjs'
import { mutate, useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Thead } from '@/components/ui'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deleteDispatch } from '@/utils/services/dispatch.service'
import { DispatchType } from '@/utils/types/dispatch.types'

type Dispatch = {
    data: DispatchType[]
    totalPrice: number
    totalQuantity: number
}

interface ListTableProps {
    status: string
    facilityUnit: string
    // dateRange: {
    //     startDate: Date
    //     endDate: Date
    // }
}

export default function ListTable({ facilityUnit, status }: ListTableProps) {
    const { loading } = useNotify()
    const { getURLs } = useURLParameters()
    console.log(status)

    const [selectedData, setSelectedData] = useState<DispatchType>()

    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    // const { data: dispatchesData } = useApi<Dispatch[]>('release', {
    //     startDate: String(dateRange?.startDate),
    //     endDate: String(dateRange?.endDate),
    //     facilityUnit: facilityUnit,
    // })

    const { data: dispatchesData } = useApi<Dispatch>(
        `release?${getURLs().toString()}&facilityUnit=${facilityUnit}`,
    )
    console.log(dispatchesData)

    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    const handlerDelete = (selectedData: DispatchType | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteDispatch(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutate((currentData: DispatchType[] | undefined) => {
                    if (!currentData) return currentData
                    return currentData.filter((item) => item.id !== selectedData?.id)
                })
            })
        } else {
            console.error('No data available to delete.')
        }
    }

    return (
        <>
            <TableContainer style={{ minHeight: '70dvh', maxHeight: '70dvh', overflowY: 'auto' }}>
                <Table>
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
                        {dispatchesData?.data.map((row) => {
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
                                    <Td>
                                        <IconButton
                                            variant="outline"
                                            size={'sm'}
                                            colorScheme="teal"
                                            aria-label="Send email"
                                            marginRight={3}
                                            onClick={() => {
                                                setSelectedData(row)
                                                setModal({ ...modal, isOpen: true })
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
                                                setSelectedData(row)
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
            </TableContainer>
            <EditModal data={selectedData} isOpen={modal.isOpen} onClose={modal.onClose} />
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

// export default ListTable
