import DateRangePicker from '@/components/DateRangePicker'
import Drawler from '@/components/Drawler'
import { RELEASE_DISTRIBUTION_ROUTE, RELEASE_REFUND_ROUTE } from '@/utils/constants/routes.consts'
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
import DistributionModal from '../components/DistributionModal'

const Distribution = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
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
                        onClick={() => navigate(RELEASE_DISTRIBUTION_ROUTE)}
                    >
                        Выдача
                    </Button>
                    <Button
                        bg={'rgba(217, 217, 217, 1)'}
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(RELEASE_REFUND_ROUTE)}
                    >
                        Возврат
                    </Button>
                </Box>
                <Avatar size={'md'} bg="teal.500" />
            </Box>

            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRangePicker></DateRangePicker>
                        <Select placeholder="Цехи" width={'fit-content'}>
                            <option value="Лепешечный">Лепешечный</option>
                            <option value="Булочный">Булочный</option>
                            <option value="Заварной">Заварной</option>
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Выдача продукции
                    </Button>
                </Box>
                <Box>
                    <Tabs variant="soft-rounded">
                        <TabList>
                            <Tab>List</Tab>
                            <Tab>Pivot</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ListTable status="0" />
                            </TabPanel>
                            <TabPanel>
                                <PivotTable status="0" />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
            <DistributionModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} status="0" />
        </Box>
    )
}

export default Distribution
