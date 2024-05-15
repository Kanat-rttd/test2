import { Table, Tr, Th, Tbody, Td, Box, Select, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {
    MIXERS_REMAIN_PRODUCTS_ROUTE,
    MIXERS_REMAIN_RAW_MATERIALS_ROUTE,
} from '@/utils/constants/routes.consts'
import Header from '@/components/Header'
import { TableContainer, Thead } from '@/components/ui'

const data = [
    {
        id: 1,
        name: 'Мука',
        remainOnTheBeginning: 100,
        baking: 100,
        sells: 100,
        defective: 500,
        remainOnTheEnd: 100,
    },
    {
        id: 1,
        name: 'Картошка',
        remainOnTheBeginning: 100,
        baking: 100,
        sells: 100,
        defective: 500,
        remainOnTheEnd: 100,
    },
]

const RemainProducts = () => {
    const navigate = useNavigate()
    return (
        <>
            <Header>
                <Button height={'100%'} onClick={() => navigate(MIXERS_REMAIN_RAW_MATERIALS_ROUTE)}>
                    Остаток сырья
                </Button>
                <Button
                    height={'100%'}
                    onClick={() => navigate(MIXERS_REMAIN_PRODUCTS_ROUTE)}
                    bg={'rgba(217, 217, 217, 1)'}
                >
                    Остаток продукции
                </Button>
            </Header>

            <Box display="flex" flexDirection="column" p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select placeholder="Название" width={'fit-content'} name="status">
                            <option value="1">Активен</option>
                            <option value="0">Приостановлен</option>
                        </Select>
                    </Box>
                </Box>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Название</Th>
                                <Th>Остаток на начало</Th>
                                <Th>Выпечка</Th>
                                <Th>Продажи</Th>
                                <Th>Брак</Th>
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
                                        <Td>{product.baking}</Td>
                                        <Td>{product.sells}</Td>
                                        <Td>{product.defective}</Td>
                                        <Td>{product.remainOnTheEnd}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default RemainProducts
