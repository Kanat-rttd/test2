import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Input,
    Box,
} from '@chakra-ui/react'
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
            },
            {
                id: 2,
                items: 'Соль',
                units: 'Шт.',
                qtyRegister: 500,
                qtyFact: 470,
                divergence: 30,
            },
        ],
        totalRegister: 1500,
        totalFact: 1458,
        divergence: 42,
    }

    return (
        <>
            <TableContainer overflowY={'auto'} height={'90%'}>
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
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Box bottom={0} position={'absolute'} width={'100%'}>
                <Table>
                    <Tfoot>
                        <Tr>
                            <Th fontSize={15} color={'#000'} width={'15%'}>
                                ИТОГО
                            </Th>
                            <Th width={'25%'}> </Th>
                            <Th> </Th>
                            <Th width={'15%'} fontSize={15} color={'#000'}>
                                {' '}
                                {data.totalRegister}
                            </Th>
                            <Th width={'15%'} fontSize={15} color={'#000'}>
                                {data.totalFact}{' '}
                            </Th>
                            <Th width={'15%'} fontSize={15} color={'#000'}>
                                {data.divergence}{' '}
                            </Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </Box>
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
