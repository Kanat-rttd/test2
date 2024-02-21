import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

const PivotTable = () => {
    interface Headers {
        bread: string
    }

    const headers = [
        {
            bread: 'Итальяснкий',
        },
        {
            bread: 'Заводской',
        },
        {
            bread: 'Батон',
        },
    ]

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Реализатор</Th>
                            {headers.map((head: Headers) => {
                                return <Th key={head.bread}>{head.bread}</Th>
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>Алишер</Td>
                            <Td>20</Td>
                            <Td>30</Td>
                            <Td> </Td>
                            <Td display={'flex'} gap={'10px'}>
                                <EditIcon boxSize={'1.5em'} cursor={'pointer'} />
                                <DeleteIcon boxSize={'1.5em'} color={'red'} cursor={'pointer'} />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default PivotTable
