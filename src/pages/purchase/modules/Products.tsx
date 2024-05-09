import DateRangePicker from '@/components/DateRangePicker'
import Drawler from '@/components/Menu'
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
import useSWR, { mutate } from 'swr'
import { useState } from 'react'
import UniversalComponent from '@/components/ui/UniversalComponent'
import DateRange from '@/components/DateRange'
import { useEffect } from 'react'
import { useApi } from '@/utils/services/axios'

interface RawMaterial {
    id: number
    name: string
    uom: string
}

interface Providers {
    id: number
    name: string
}

const Products = () => {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    useEffect(() => {
        console.log(selectionRange.startDate)
        console.log(selectionRange.endDate)
    }, [selectionRange])

    const { data: rawMaterialData } = useApi<RawMaterial[]>('rawMaterials')
    console.log(rawMaterialData)

    const { data: providersData } = useSWR<Providers[]>('providers', {
        fetcher: () => getAllProviders(),
    })

    // const { data: facilityUnitsData } = useSWR<FacilityUnit[]>('mixers', {
    //     fetcher: () => getAllBakingFacilityUnits(),
    // })

    const [selectedProviderId, setSelectedProviderId] = useState<string>('')
    const [selectedRawMaterial, setRawMaterial] = useState<string>('')

    const handleProviderChange = (event: any) => {
        setSelectedProviderId(event.target.value)
    }

    const handleRawMaterialChange = (event: any) => {
        setRawMaterial(event.target.value)
    }

    const handleAddProduct = () => {
        console.log('mutate')
        mutate('productPurchase')
    }

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UniversalComponent>
                <Box
                    width={'100%'}
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                >
                    <Box width={'100%'} display={'flex'}>
                        <Drawler></Drawler>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(PURCHASE_PRODUCTS_ROUTE)}
                            background={'rgba(217, 217, 217, 1)'}
                        >
                            Закуп
                        </Button>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(PURCHASE_DEBT_ROUTE)}
                        >
                            Долги по закупу
                        </Button>
                    </Box>
                    <Avatar bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'calc(100vh-64px)'} p={5}>
                    <Tabs variant="soft-rounded">
                        <TabList justifyContent={'space-between'}>
                            <Box display={'flex'}>
                                <Tab>List</Tab>
                                {/* <Tab>Pivot</Tab> */}
                            </Box>

                            <Button colorScheme="purple" onClick={onOpen}>
                                Добавить закупки
                            </Button>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Box display={'flex'} gap={'15px'} marginBottom={10}>
                                    <DateRange
                                        selectionRange={selectionRange}
                                        setSelectionRange={setSelectionRange}
                                    />
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
                                        placeholder="Материалы"
                                        value={selectedRawMaterial}
                                        onChange={handleRawMaterialChange}
                                        width={'fit-content'}
                                    >
                                        {rawMaterialData?.map((units) => (
                                            <option key={units.id} value={units.id}>
                                                {units.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                <ListTable
                                    selectedProviderId={selectedProviderId}
                                    selectedRawMaterial={selectedRawMaterial}
                                    dateRange={selectionRange}
                                />
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
                <PurchaseModal isOpen={isOpen} onClose={onClose} onSuccess={handleAddProduct} />
            </UniversalComponent>
        </>
    )
}

export default Products
