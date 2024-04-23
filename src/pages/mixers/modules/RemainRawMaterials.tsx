import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    Avatar,
    Select,
    Button,
} from '@chakra-ui/react'
import Drawler from '@/components/Drawler'
import { useNavigate } from 'react-router-dom'
import {
    MIXERS_REMAIN_PRODUCTS_ROUTE,
    MIXERS_REMAIN_RAW_MATERIALS_ROUTE,
} from '@/utils/constants/routes.consts'

const data = [
    {
        id: 1,
        name: 'Мука',
        remainOnTheBeginning: 100,
        expense: 500,
        arrival: 500,
        remainOnTheEnd: 100,
    },
    {
        id: 2,
        name: 'Картошка',
        remainOnTheBeginning: 100,
        expense: 500,
        arrival: 500,
        remainOnTheEnd: 100,
    },
]

const RemainRawMaterials = () => {
    const navigate = useNavigate()
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
                        onClick={() => navigate(MIXERS_REMAIN_RAW_MATERIALS_ROUTE)}
                        bg={'rgba(217, 217, 217, 1)'}
                    >
                        Остаток сырья
                    </Button>
                    <Button height={'100%'} onClick={() => navigate(MIXERS_REMAIN_PRODUCTS_ROUTE)}>
                        Остаток продукции
                    </Button>
                </Box>
                <Avatar bg="teal.500" />
            </Box>

            <Box display="flex" flexDirection="column" p={5} minHeight="100vh">
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select placeholder="Название" width={'fit-content'} name="status">
                            <option value="1">Активен</option>
                            <option value="0">Приостановлен</option>
                        </Select>
                    </Box>
                </Box>
                <TableContainer maxWidth={'100%'} width={'100%'} flex="1">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Название</Th>
                                <Th>Остаток на начало</Th>
                                <Th>Расход</Th>
                                <Th>Приход</Th>
                                <Th>Остаток на конец</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((product, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{product.id}</Td>
                                        <Td>{product.name}</Td>
                                        <Td>{product.remainOnTheBeginning}</Td>
                                        <Td>{product.expense}</Td>
                                        <Td>{product.arrival}</Td>
                                        <Td>{product.remainOnTheEnd}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Box>
                    <TableContainer maxWidth={'100%'} width={'100%'}>
                        <Table variant="simple">
                            <Tbody>
                                <Tr>
                                    <Td></Td>
                                    <Td>Итого</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                    <Td>100</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default RemainRawMaterials
