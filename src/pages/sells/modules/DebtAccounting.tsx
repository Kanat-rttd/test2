import {
    Box,
    Button,
    Avatar,
    Select,
    Table,
    Tr,
    Td,
    Thead,
    Tbody,
    Th,
    TableContainer,
    Tfoot,
} from '@chakra-ui/react'
import Drawler from '@/components/Drawler'
import {
    SELLS_JOURNAL_ROUTE,
    SELLS_INVOICE_ROUTE,
    SELLS_DEBT_TRANSFER_ROUTE,
} from '@/utils/constants/routes.consts'

import { useNavigate } from 'react-router-dom'

const DebtAccounting = () => {
    const data = {
        mainData: [
            {
                id: 1,
                provider: 'Алишер',
                debt: 6200,
            },
            {
                id: 2,
                provider: 'Максат',
                debt: 5400,
            },
        ],
        total: 5000,
    }

    const navigate = useNavigate()
    // const [getSalesData, setSalesData] = useState<OrderArray[]>([])
    // const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[] | undefined>()

    // useEffect(() => {
    //     getAllBakingFacilityUnits().then((responseData) => {
    //         setFacilityUnits(responseData)
    //         console.log(responseData)
    //     })
    // }, [])

    // useEffect(() => {
    //     getAllSales().then((res) => {
    //         console.log(res.data)
    //         setSalesData(res.data)
    //     })
    // }, [])

    return (
        <>
            <Box>
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
                            onClick={() => navigate(SELLS_JOURNAL_ROUTE)}
                        >
                            Журнал Продаж
                        </Button>
                        <Button
                            onClick={() => navigate(SELLS_INVOICE_ROUTE)}
                            height={'100%'}
                            width={'20%'}
                        >
                            Накладной
                        </Button>
                        <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                            Учёт долгов
                        </Button>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(SELLS_DEBT_TRANSFER_ROUTE)}
                        >
                            Перевод долга
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
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
                                        <Th>Реализатор</Th>
                                        <Th>Сумма долга</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.mainData.map((item) => {
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
                                            {data.total}
                                        </Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DebtAccounting
