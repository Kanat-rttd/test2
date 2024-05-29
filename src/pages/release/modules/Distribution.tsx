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
import ListTable from '../components/ListTable'
import PivotTable from '../components/PivotTable'
import DistributionModal from '../components/DistributionModal'
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { DispatchType } from '@/utils/types/dispatch.types'

interface FacilityUnit {
    id: number
    facilityUnit: string
}

type Dispatch = {
    data: DispatchType[]
    totalPrice: number
    totalQuantity: number
}

const Distribution = () => {
    const { getParam, getURLs, setParam } = useURLParameters()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')
    const { mutate: mutateDispatchesData } = useApi<Dispatch>(`release?${getURLs().toString()}`)

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setParam('facilityUnit', event.target.value)
    }

    const handleUpdateProduct = () => {
        mutateDispatchesData()
    }

    return (
        <Box>
            <UniversalComponent>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box
                        marginBottom={'40.5px'}
                        height={'5%'}
                        display={'flex'}
                        justifyContent={'space-between'}
                    >
                        <Box display={'flex'} gap={'15px'} width={'100%'}>
                            <DateRange />
                            <Select
                                size={'sm'}
                                borderRadius={5}
                                placeholder="Цех"
                                width={'fit-content'}
                                value={getParam('facilityUnit')}
                                onChange={handleClientChange}
                            >
                                {facilityUnitsData?.map((unit, index) => (
                                    <option key={index} value={unit.id}>
                                        {unit.facilityUnit}
                                    </option>
                                ))}
                            </Select>
                        </Box>

                        <Button colorScheme="purple" onClick={onOpen} height={'32px'} p={'0 25px'}>
                            Выдача продукции
                        </Button>
                    </Box>
                    <Box>
                        <Tabs variant="soft-rounded" height={'100%'} mt={'-15.5px'}>
                            <TabList height={'22px'}>
                                <Tab>List</Tab>
                                <Tab>Pivot</Tab>
                            </TabList>
                            <TabPanels height={'95%'}>
                                <TabPanel height={'100%'} p={'10px 0'}>
                                    <ListTable facilityUnit={'0'} status="0" />
                                </TabPanel>
                                <TabPanel p={'10px 0'}>
                                    <PivotTable status="0" />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
                <DistributionModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    onSuccess={handleUpdateProduct}
                    status="0"
                />
            </UniversalComponent>
        </Box>
    )
}

export default Distribution
