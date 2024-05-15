import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconButton, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { deleteDispatch, getAllDispatches } from '@/utils/services/dispatch.service'
import { TableContainer, Thead } from '@/components/ui'
import Dialog from '@/components/Dialog'
import EditModal from './EditModal'
import { DispatchType } from '@/utils/types/dispatch.types'
import { useNotify } from '@/utils/providers/ToastProvider'
import { mutate } from 'swr'

interface PivotTableProps {
    status: string
}

const PivotTable: React.FC<PivotTableProps> = ({ status }) => {
    const { loading } = useNotify()
    console.log(status)
    const [data, setData] = useState<DispatchType[]>([])
    const [headers, setHeaders] = useState<any[]>([])
    const [selectedData, setSelectedData] = useState<DispatchType>()

    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })
    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    useEffect(() => {
        getAllDispatches().then((res) => {
            console.log(res.data)
            const uniqueProductNames = [
                ...new Set(
                    res.data
                        .filter((row: DispatchType) => row.dispatch == Number(status))
                        .flatMap((item: DispatchType) =>
                            item.goodsDispatchDetails.map((detail) => detail.product.name),
                        ),
                ),
            ]
            const headers = uniqueProductNames.map((name) => ({ bread: name }))

            setHeaders(headers)
            setData(res.data.filter((row: DispatchType) => row.dispatch == Number(status)))
        })
    }, [])

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
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Реализатор</Th>
                            {headers.map((head) => (
                                <Th key={head.bread}>{head.bread}</Th>
                            ))}
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((row) => (
                            <Tr key={row.id}>
                                <Td>{row.id}</Td>
                                <Td>{row.client.name}</Td>
                                {headers.map((header, index) => {
                                    const quantity = row.goodsDispatchDetails.find(
                                        (detail) => detail.product.name === header.bread,
                                    )?.quantity
                                    return <Td key={index}>{quantity}</Td>
                                })}
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
                        ))}
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

export default PivotTable
