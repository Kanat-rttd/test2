import { useEffect, useState } from 'react'
import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import { getAll } from '@/utils/services/baking.service'

import TopNavBar from '@/components/NavBar'
import dayjs from 'dayjs'

interface Baking {
    breadType: string
    flour: number
    salt: number
    yeast: number
    malt: number
    butter: number
    temperature: number
    time: Date
    output: number
    spoilage: number
}

const BakingPage = () => {
    const [data, setData] = useState<Baking[]>()

    useEffect(() => {
        getAll().then((res) => {
            console.log(res)
            setData(res)
        })
    }, [])

    return (
        <>
            <TopNavBar></TopNavBar>
            <Box p={5} display="flex" flexDirection={'column'} height="80vh">
                <TableContainer maxWidth={'100%'} width={'100%'} p={5} overflowY={'scroll'}>
                    <Table variant="striped" colorScheme="teal" size="lg" width={'100%'}>
                        <Thead>
                            <Tr>
                                <Th>Вид хлеба</Th>
                                <Th isNumeric>Мука</Th>
                                <Th isNumeric>Соль</Th>
                                <Th isNumeric>Дрожжи</Th>
                                <Th isNumeric>Солод</Th>
                                <Th isNumeric>Масло</Th>
                                <Th isNumeric>t°</Th>
                                <Th isNumeric>Время</Th>
                                <Th isNumeric>Выход</Th>
                                <Th isNumeric>Брак</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((bakingRow, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{bakingRow.breadType}</Td>
                                        <Td>{bakingRow.flour}</Td>
                                        <Td>{bakingRow.salt}</Td>
                                        <Td>{bakingRow.yeast}</Td>
                                        <Td>{bakingRow.malt}</Td>
                                        <Td>{bakingRow.butter}</Td>
                                        <Td>{bakingRow.temperature}</Td>
                                        <Td>{dayjs(bakingRow.time).format('HH:mm')}</Td>
                                        <Td>{bakingRow.output}</Td>
                                        <Td>{bakingRow.spoilage}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Td width={'80%'}>Итого</Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default BakingPage
