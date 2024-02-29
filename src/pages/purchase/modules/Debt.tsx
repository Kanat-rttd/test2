import Drawler from '@/components/Drawler'
import { PURCHASE_DEBT_ROUTE, PURCHASE_PRODUCTS_ROUTE } from '@/utils/constants/routes.consts'
import {
    Avatar,
    Box,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Select,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Debt = () => {
    const navigate = useNavigate()

    const data = [
        {
            id: 1,
            provider: 'ИП Калитанова К.М.',
            debt: 6200,
        },
        {
            id: 2,
            provider: 'Рынок',
            debt: 5400,
        },
    ]

    const totalDebt = 11600

    return (
        <>
            <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(PURCHASE_PRODUCTS_ROUTE)}
                    >
                        Закуп
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(PURCHASE_DEBT_ROUTE)}
                        background={'rgba(217, 217, 217, 1)'}
                    >
                        Долги по закупу
                    </Button>
                </Box>
                <Avatar bg="teal.500" />
            </Box>

            <Box padding={10} width={'25%'}>
                <Select placeholder="Поставщик">
                    <option>Поставщик</option>
                </Select>
            </Box>
            <Box padding={10}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Поставщик</Th>
                                <Th>Сумма долга</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>{item.id}</Td>
                                        <Td>{item.provider}</Td>
                                        <Td>{item.debt}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th color={'#000'} fontSize={15}>
                                    ИТОГО
                                </Th>
                                <Th> </Th>
                                <Th color={'#000'} fontSize={15}>
                                    {totalDebt}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Debt
