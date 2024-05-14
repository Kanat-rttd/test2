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
import { mutate } from '@/utils/services/axios'
import { useNavigate } from 'react-router-dom'
import ListTable from '../components/ListTable'
import PivotTable from '../components/PivotTable'
import DistributionModal from '../components/DistributionModal'
import DateRange from '@/components/DateRange'
import { useState } from 'react'
import { useApi } from '@/utils/services/axios'
import UniversalComponent from '@/components/ui/UniversalComponent'

interface FacilityUnit {
    id: number
    facilityUnit: string
}

const Distribution = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    // const [selectionRange, setSelectionRange] = useState({
    //     startDate: new Date(),
    //     endDate: new Date(),
    // })

    const [selectedFacilityUnit, setSelectedFacilityUnit] = useState('')

    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')

    // useEffect(() => {
    //     console.log(selectionRange.startDate)
    //     console.log(selectionRange.endDate)
    // }, [selectionRange])

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFacilityUnit(event.target.value)
    }

    const handleUpdateProduct = () => {
        mutate('release')
        console.log('success Distribution')
    }

    return (
        <UniversalComponent>
            <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
                height={'6%'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        bg={'rgba(217, 217, 217, 1)'}
                        onClick={() => navigate(RELEASE_DISTRIBUTION_ROUTE)}
                    >
                        Выдача
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(RELEASE_REFUND_ROUTE)}
                    >
                        Возврат
                    </Button>
                </Box>
                <Avatar size={'md'} bg="teal.500" />
            </Box>

            <Box width={'100%'} height={'94%'} p={5}>
                <Box
                    marginBottom={10}
                    height={'5%'}
                    display={'flex'}
                    justifyContent={'space-between'}
                >
                    <Box display={'flex'} gap={'15px'} width={'100%'}>
                        <DateRange />
                        <Select
                            placeholder="Цехи"
                            width={'fit-content'}
                            value={selectedFacilityUnit}
                            onChange={handleClientChange}
                        >
                            {facilityUnitsData?.map((unit, index) => (
                                <option key={index} value={unit.id}>
                                    {unit.facilityUnit}
                                </option>
                            ))}
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Выдача продукции
                    </Button>
                </Box>
                <Box height={'calc(95% - 2.5rem)'}>
                    <Tabs variant="soft-rounded" height={'100%'}>
                        <TabList height={'5%'}>
                            <Tab>List</Tab>
                            <Tab>Pivot</Tab>
                        </TabList>
                        <TabPanels height={'95%'}>
                            <TabPanel height={'100%'}>
                                <ListTable
                                    facilityUnit={selectedFacilityUnit}
                                    // dateRange={selectionRange}
                                    status="0"
                                />
                            </TabPanel>
                            <TabPanel>
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
    )
}

export default Distribution
