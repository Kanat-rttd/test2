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
import PurchaseModal from '../components/PurchaseModal'
import { getAllProviders } from '@/utils/services/providers.service'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'
import useSWR, { mutate } from 'swr'
import { useState } from 'react'

interface FacilityUnit {
    id: number
    facilityUnit: string
}

interface Providers {
    id: number
    name: string
}

const Products = () => {
    const { data: providersData } = useSWR<Providers[]>('providers', {
        fetcher: () => getAllProviders(),
    })

    const { data: facilityUnitsData } = useSWR<FacilityUnit[]>('mixers', {
        fetcher: () => getAllBakingFacilityUnits(),
    })

    const [selectedProviderId, setSelectedProviderId] = useState<string>('')
    const [selectedFacilityUnitId, setSelectedFacilityUnitId] = useState<string>('')

    const handleProviderChange = (event: any) => {
        setSelectedProviderId(event.target.value)
    }

    const handleFacilityUnitChange = (event: any) => {
        setSelectedFacilityUnitId(event.target.value)
    }

    const handleAddProduct = () => {
        console.log('mutate')
        mutate('productPurchase')
    }

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
                                    <Select
                                        placeholder="Поставщик"
                                        value={selectedProviderId}
                                        onChange={handleProviderChange}
                                        width={'fit-content'}
                                    >
                                        {providersData?.map((provider) => (
                                            <option key={provider.id} value={provider.id}>
                                                {provider.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <Select
                                        placeholder="Цехи"
                                        value={selectedFacilityUnitId}
                                        onChange={handleFacilityUnitChange}
                                        width={'fit-content'}
                                    >
                                        {facilityUnitsData?.map((units) => (
                                            <option key={units.id} value={units.id}>
                                                {units.facilityUnit}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                <ListTable selectedProviderId={selectedProviderId} />
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
            <PurchaseModal isOpen={isOpen} onClose={onClose} onSuccess={handleAddProduct} />
        </>
    )
}

export default Products
