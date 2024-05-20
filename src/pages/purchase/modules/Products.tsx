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
        mutate('productPurchase')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UniversalComponent>
                <Box width={'100%'} height={'calc(100vh-64px)'} p={5} pt={4}>
                    <Tabs variant="soft-rounded" mt={'-5px'}>
                        <Box display={'flex'} alignItems={'center'}
                        justifyContent={'space-between'}>
                            <Box>
                                <TabList height={'22px'}>
                                    <Tab>List</Tab>
                                    <Tab>Pivot</Tab>
                                </TabList>
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    mt={3} mb={2}
                                >
                                    <Box display={'flex'} gap={'15px'}>
                                        <DateRange />
                                        <Select
                                            size={'sm'}
                                            borderRadius={4}
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
                                            size={'sm'}
                                            borderRadius={5}
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
                                        <Select
                                            placeholder="Статус"
                                            width={'fit-content'}
                                            value={getParam('status')}
                                            size={'sm'}
                                            borderRadius={5}
                                            onChange={(e) => setParam('status', e.target.value)}
                                        >
                                            <option value="Активный">Активный</option>
                                            <option value="Неактивный">Неактивный</option>
                                        </Select>
                                    </Box>
                                </Box>
                            </Box>
                            <Button colorScheme="purple" onClick={onOpen}>
                                Добавить закупки
                            </Button>
                        </Box>

                        <TabPanels>
                            <TabPanel height={'100%'} p={'10px 0'}>
                                <ListTable />
                            </TabPanel>
                            <TabPanel height={'100%'} p={'10px 0'}>
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
