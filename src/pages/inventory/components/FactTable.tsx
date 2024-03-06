import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

const FactTable = () => {
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

export default FactTable
