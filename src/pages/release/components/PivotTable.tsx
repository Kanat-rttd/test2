import { Table, Tbody, Td, Th, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TableContainer, Thead } from '@/components/ui'
import { DispatchType } from '@/utils/types/dispatch.types'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'

interface PivotTableProps {
    status: string
}

type Dispatch = {
    data: DispatchType[]
    totalPrice: number
    totalQuantity: number
}

const PivotTable: React.FC<PivotTableProps> = ({ status }) => {
    const { getURLs } = useURLParameters()
    const [data, setData] = useState<DispatchType[]>([])
    const [headers, setHeaders] = useState<any[]>([])

    const { data: dispatchesData } = useApi<Dispatch>(
        `release?${getURLs().toString()}&status=${status}`,
    )

    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })
    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    useEffect(() => {
        if (!dispatchesData) return

        const uniqueProductNames = [
            ...new Set(
                dispatchesData.data
                    .filter((row: DispatchType) => row.dispatch == Number(status))
                    .flatMap((item: DispatchType) =>
                        item.goodsDispatchDetails.map((detail) => detail.product.name),
                    ),
            ),
        ]
        const headers = uniqueProductNames.map((name) => ({ bread: name }))

        setHeaders(headers)
        setData(dispatchesData.data.filter((row: DispatchType) => row.dispatch == Number(status)))
    }, [dispatchesData])

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
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.length ? (
                            data
                                .sort((a, b) => a.id - b.id)
                                .map((row, index) => (
                                    <Tr key={row.id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{row.contragent.contragentName}</Td>
                                        {headers.map((header, index) => {
                                            const quantity = row.goodsDispatchDetails.find(
                                                (detail) => detail.product.name === header.bread,
                                            )?.quantity
                                            return <Td key={index}>{quantity}</Td>
                                        })}
                                    </Tr>
                                ))
                        ) : (
                            <Tr>
                                <Td>Нет данных</Td>
                                <Td></Td>
                                {headers.map((_, index) => (
                                    <Th key={index}></Th>
                                ))}
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default PivotTable
