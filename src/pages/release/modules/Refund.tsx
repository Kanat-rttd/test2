import Drawler from '@/components/Menu'
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
import DateRange from '@/components/DateRange'

const Refund = () => {
    const handleSuccess = () => {
        console.log('1')
    }

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box position={'relative'}>
            <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                bg={'rgb(240, 240, 240)'}
                position={'sticky'}
                top={0}
                zIndex={1000}
                p={'0rem 0.5rem'}
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
                <Box marginBottom={7} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRange />
                        <Select placeholder="Цехи" width={'fit-content'}>
                            <option value="Лепешечный">Лепешечный</option>
                            <option value="Булочный">Булочный</option>
                            <option value="Заварной">Заварной</option>
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Возврат продукции
                    </Button>
                </Box>
                <Box height={'calc(95% - 2.5rem)'}>
                    <Tabs variant="soft-rounded" height={'100%'}>
                        <TabList height={'22.5px'}>
                            <Tab>List</Tab>
                            <Tab>Pivot</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ListTable
                                    facilityUnit={'0'}
                                    // dateRange={{ startDate: new Date(), endDate: new Date() }}
                                    status="0"
                                />
                            </TabPanel>
                            <TabPanel>
                                <PivotTable status="1" />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
            <DistributionModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                onSuccess={handleSuccess}
                status="1"
            />
        </Box>
    )
}

export default Refund
