import { Box, Button, Select, Table, Tbody, Td, Th, Tr, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TableContainer, Thead } from '@/components/ui'
import { DispatchType } from '@/utils/types/dispatch.types'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import DateRange from '@/components/DateRange'

interface PivotTableProps {
    status: string
}

type Dispatch = {
    data: DispatchType[]
    totalPrice: number
    totalQuantity: number
}

interface FacilityUnit {
    id: number
    facilityUnit: string
}

const PivotTable: React.FC<PivotTableProps> = ({ status }) => {
    const { getURLs, setParam, getParam } = useURLParameters()
    const [data, setData] = useState<DispatchType[]>([])
    const [headers, setHeaders] = useState<any[]>([])
    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')

    const { data: dispatchesData } = useApi<Dispatch>(`release?${getURLs().toString()}&status=${status}`)
    const { onOpen } = useDisclosure()

    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })
    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setParam('facilityUnit', event.target.value)
    }

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
            <Box
                mt={2}
                marginBottom={'20px'}
                height={'5%'}
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Box display={'flex'} gap={'15px'} width={'100%'}>
                    <DateRange />
                    <Select
                        size={'sm'}
                        borderRadius={5}
                        placeholder="Цех"
                        width={'fit-content'}
                        value={getParam('facilityUnit')}
                        onChange={handleClientChange}
                    >
                        {facilityUnitsData?.map((unit, index) => (
                            <option key={index} value={unit.id}>
                                {unit.facilityUnit}
                            </option>
                        ))}
                    </Select>
                </Box>

                <Button colorScheme="purple" onClick={onOpen} height={'32px'} p={'0 25px'}>
                    Выдача продукции
                </Button>
            </Box>
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
                        {data
                            .sort((a, b) => a.id - b.id)
                            .map((row, index) => (
                                <Tr key={row.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{row.client.name}</Td>
                                    {headers.map((header, index) => {
                                        const quantity = row.goodsDispatchDetails.find(
                                            (detail) => detail.product.name === header.bread,
                                        )?.quantity
                                        return <Td key={index}>{quantity}</Td>
                                    })}
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default PivotTable
