import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { Table, Tbody, Tr, Th, Td, Input, Box } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

type EditInput = {
    rowId: number | null
    value: number
}

interface Inventoryzation {
    table: {
        id: number
        goods: string
        unitOfMeasure: string
        accountingQuantity: string
        factQuantity: number
        adjustments: number
        discrepancy: number
    }[]
    totalRegister: number
    totalFact: number
    divergence: number
}

const InventoryTable = () => {
    const { getURLs } = useURLParameters()
    const { data: inventoryzationData } = useApi<Inventoryzation>(
        `reports/inventoryzation?${getURLs().toString()}`,
    )

    console.log(inventoryzationData)

    const [showInput, setShowInput] = useState<EditInput>()

    return (
        <>
            <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <Table variant="simple" width={'100%'}>
                    <Thead>
                        <Tr position={'sticky'} top={0} backgroundColor={'white'}>
                            <Th width={'15%'}>№</Th>
                            <Th width={'25%'}>Товары</Th>
                            <Th width={'15%'}>Единица измерения</Th>
                            <Th width={'15%'}>Количество по учету</Th>
                            <Th width={'15%'}>Количество фактическое</Th>
                            <Th width={'15%'}>Расхождение</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {inventoryzationData?.table.map((item, index) => {
                            return (
                                <Tr key={item.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.goods}</Td>
                                    <Td>{item.unitOfMeasure}</Td>
                                    <Td>{item.accountingQuantity}</Td>
                                    <Td
                                        onClick={() =>
                                            setShowInput({
                                                rowId: item.id,
                                                value: item.factQuantity,
                                            })
                                        }
                                    >
                                        {showInput?.rowId === item.id ? (
                                            <EditInput
                                                setShowInput={setShowInput}
                                                showInput={showInput}
                                            />
                                        ) : (
                                            item.factQuantity
                                        )}
                                    </Td>
                                    <Td>{item.discrepancy}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th fontSize={15} color={'#000'}>
                                ИТОГО
                            </Th>
                            <Th> </Th>
                            <Th> </Th>
                            <Th fontSize={15} color={'#000'}>
                                {inventoryzationData?.totalRegister}
                            </Th>
                            <Th fontSize={15} color={'#000'}>
                                {inventoryzationData?.totalFact}{' '}
                            </Th>
                            <Th fontSize={15} color={'#000'}>
                                {inventoryzationData?.divergence}{' '}
                            </Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    )
}

export default InventoryTable

type EditInputProps = {
    setShowInput: Dispatch<SetStateAction<EditInput | undefined>>
    showInput: EditInput
}

const EditInput = ({ setShowInput, showInput }: EditInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowInput({ rowId: showInput.rowId, value: Number(e.target.value) })
    }

    return (
        <Input
            onChange={(e) => handleChange(e)}
            value={showInput.value}
            onBlur={() => {
                setShowInput({ rowId: null, value: showInput.value })
                //fetch
            }}
            type="number"
            autoFocus
        />
    )
}
