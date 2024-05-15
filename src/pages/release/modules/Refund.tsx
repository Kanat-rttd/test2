import { RELEASE_DISTRIBUTION_ROUTE, RELEASE_REFUND_ROUTE } from '@/utils/constants/routes.consts'
import {
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
import Header from '@/components/Header'
import UniversalComponent from '@/components/ui/UniversalComponent'

const Refund = () => {
    const handleSuccess = () => {
        console.log('1')
    }

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            <UniversalComponent>
                <Header>
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
                </Header>

                <Box width={'100%'} height={'100%'} p={5}>
                    <Box
                        marginBottom={'35px'}
                        height={'5%'}
                        display={'flex'}
                        justifyContent={'space-between'}
                    >
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <DateRange />
                            <Select
                                placeholder="Цехи"
                                width={'fit-content'}
                                size={'sm'}
                                borderRadius={5}
                            >
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                        </Box>

                        <Button colorScheme="purple" height={'32px'} onClick={onOpen} p={'0 15px'}>
                            Возврат продукции
                        </Button>
                    </Box>
                    <Box>
                        <Tabs variant="soft-rounded" mt={'-10px'}>
                            <TabList height={'22px'}>
                                <Tab>List</Tab>
                                <Tab>Pivot</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={'10px 0'}>
                                    <ListTable facilityUnit={'0'} status="0" />
                                </TabPanel>
                                <TabPanel p={'10px 0'}>
                                    <PivotTable status="1" />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </UniversalComponent>
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
