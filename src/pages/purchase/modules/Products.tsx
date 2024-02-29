import DateRangePicker from '@/components/DateRangePicker'
import Drawler from '@/components/Drawler'
import { PURCHASE_DEBT_ROUTE, PURCHASE_PRODUCTS_ROUTE } from '@/utils/constants/routes.consts'
import {
    Avatar,
    Box,
    Button,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import ListTable from '../components/ListTable'
import PivotTable from '../components/PivotTable'

const Products = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

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
            <Box width={'100%'} height={'100%'} p={5}>
                <Box>
                    <Tabs variant="soft-rounded">
                        <TabList justifyContent={'space-between'}>
                            <Box display={'flex'}>
                                <Tab>List</Tab>
                                <Tab>Pivot</Tab>
                            </Box>

                            <Button colorScheme="purple" onClick={onOpen}>
                                Добавить закупки
                            </Button>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Box
                                    display={'flex'}
                                    gap={'15px'}
                                    width={'fit-content'}
                                    marginBottom={10}
                                >
                                    <DateRangePicker></DateRangePicker>
                                    <Select placeholder="Поставщик" width={'fit-content'}>
                                        <option value="Поставщик">Поставщик</option>
                                    </Select>
                                    <Select placeholder="Цехи" width={'fit-content'}>
                                        <option value="Лепешечный">Лепешечный</option>
                                        <option value="Булочный">Булочный</option>
                                        <option value="Заварной">Заварной</option>
                                    </Select>
                                </Box>
                                <ListTable />
                            </TabPanel>
                            <TabPanel>
                                <Box width={'25%'}>
                                    <DateRangePicker></DateRangePicker>
                                </Box>
                                <PivotTable />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Box></Box>
            </Box>
        </>
    )
}

export default Products
