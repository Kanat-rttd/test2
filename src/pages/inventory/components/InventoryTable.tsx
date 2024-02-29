import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Input } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'

type EditInput = {
    rowId: number | null
    value: number
}

const InventoryTable = () => {
    const [showInput, setShowInput] = useState<EditInput>()
    const data = {
        table: [
            {
                id: 1,
                items: 'Мука',
                units: 'Шт.',
                qtyRegister: 1000,
                qtyFact: 988,
                divergence: 12,
                date: '14:20 15.02.2024',
            },
            {
                id: 2,
                items: 'Соль',
                units: 'Шт.',
                qtyRegister: 500,
                qtyFact: 470,
                divergence: 30,
                date: '14:25 15.02.2024',
            },
        ],
        totalRegister: 1500,
        totalFact: 1458,
        divergence: 42,
    }

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Товары</Th>
                            <Th>Единица измерения</Th>
                            <Th>Количество по учету</Th>
                            <Th>Количество фактическое</Th>
                            <Th>Расхождение</Th>
                            <Th>Время изменения</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.table.map((item) => {
                            return (
                                <Tr key={item.id}>
                                    <Td>{item.id}</Td>
                                    <Td>{item.items}</Td>
                                    <Td>{item.units}</Td>
                                    <Td>{item.qtyRegister}</Td>
                                    <Td
                                        onClick={() =>
                                            setShowInput({ rowId: item.id, value: item.qtyFact })
                                        }
                                    >
                                        {showInput?.rowId === item.id ? (
                                            <EditInput
                                                setShowInput={setShowInput}
                                                showInput={showInput}
                                            />
                                        ) : (
                                            item.qtyFact
                                        )}
                                    </Td>
                                    <Td>{item.divergence}</Td>
                                    <Td>{item.date}</Td>
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
                                {data.totalRegister}
                            </Th>
                            <Th fontSize={15} color={'#000'}>
                                {data.totalFact}
                            </Th>
                            <Th fontSize={15} color={'#000'}>
                                {' '}
                                {data.divergence}
                            </Th>
                            <Th> </Th>
                            <Th> </Th>
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
