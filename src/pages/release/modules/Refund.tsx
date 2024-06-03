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
import PivotTable from '../components/PivotTable'
import DistributionModal from '../components/DistributionModal'
import DateRange from '@/components/DateRange'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useApi } from '@/utils/services/axios'
import ListTable from '../components/ListTable'

export interface FacilityUnit {
    id: number
    facilityUnit: string
}


const Refund = () => {
    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')
    const handleSuccess = () => {
        console.log('1')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            <UniversalComponent>
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
                                placeholder="Цех"
                                width={'fit-content'}
                                size={'sm'}
                                borderRadius={5}
                            >
                                {facilityUnitsData?.map((unit, index) => (
                            <option key={index} value={unit.id}>
                                {unit.facilityUnit}
                            </option>
                        ))}
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
                                    <ListTable status="1" />
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
