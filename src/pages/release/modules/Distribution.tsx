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
import { useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { DispatchType } from '@/utils/types/dispatch.types'
import DateRange from '@/components/DateRange'

type Dispatch = {
    data: DispatchType[]
    totalPrice: number
    totalQuantity: number
}

export interface FacilityUnit {
    id: number
    facilityUnit: string
}

const Distribution = () => {
    const { getURLs, setParam, getParam } = useURLParameters()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutate: mutateDispatchesData } = useApi<Dispatch>(`release?${getURLs().toString()}`)
    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')

    const handleUpdateProduct = () => {
        mutateDispatchesData()
    }
    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setParam('facilityUnit', event.target.value)
    }

    return (
        <Box>
            <Box
                p={5}
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
            <Box width={'100%'} height={'100%'} p={5}>
                <Box>
                    <Tabs variant="soft-rounded" height={'100%'}  mt={'-19.5px'}>
                        <TabList height={'22px'}>
                            <Tab>List</Tab>
                            <Tab>Pivot</Tab>
                        </TabList>
                        <TabPanels height={'95%'}>
                            <TabPanel height={'100%'} p={'10px 0'}>
                                <ListTable status="0" />
                            </TabPanel>
                            <TabPanel p={'10px 0'}>
                                <PivotTable status="0" />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
            {isOpen && <DistributionModal
                isOpen={isOpen}
                onClose={onClose}
                onSuccess={handleUpdateProduct}
                status="0"
            />}
        </Box>
    )
}

export default Distribution
