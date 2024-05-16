import DateRangePicker from '@/components/DateRangePicker'
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
import PurchaseModal from '../components/PurchaseModal'
import { getAllProviders } from '@/utils/services/providers.service'
import useSWR, { mutate } from 'swr'
import UniversalComponent from '@/components/ui/UniversalComponent'
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

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
    const { setParam, getParam } = useURLParameters()
    const { data: rawMaterialData } = useApi<RawMaterial[]>('rawMaterials')
    console.log(rawMaterialData)

    const { data: providersData } = useSWR<Providers[]>('providers', {
        fetcher: () => getAllProviders(),
    })

    // const { data: facilityUnitsData } = useSWR<FacilityUnit[]>('mixers', {
    //     fetcher: () => getAllBakingFacilityUnits(),
    // })


    const handleProviderChange = (event: any) => {
        setParam('providerId', event.target.value)
    }

    const handleRawMaterialChange = (event: any) => {
        setParam('rawMaterialId', event.target.value)
    }

    const handleAddProduct = () => {
        console.log('mutate')
        mutate('productPurchase')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UniversalComponent>
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
                                    <DateRange />
                                    <Select
                                        placeholder="Поставщик"
                                        value={getParam('providerId')}
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
                                        value={getParam('rawMaterialId')}
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
                <PurchaseModal isOpen={isOpen} onClose={onClose} onSuccess={handleAddProduct} />
            </UniversalComponent>
        </>
    )
}

export default Products
