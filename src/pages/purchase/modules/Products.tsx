import {
    Box,
    Button,
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
import { mutate } from 'swr'
import UniversalComponent from '@/components/ui/UniversalComponent'

const Products = () => {
    const handleAddProduct = () => {
        mutate('productPurchase')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UniversalComponent>
                <Box width={'100%'} height={'calc(100vh-64px)'} p={5} pt={4}>
                    <Tabs variant="soft-rounded" >
                        <Box
                            display={'flex'}
                            // alignItems={'center'}
                            justifyContent={'space-between'}
                            mt={'-5px'}
                        >
                            <Box>
                                <TabList height={'22px'}>
                                    <Tab>List</Tab>
                                    <Tab>Pivot</Tab>
                                </TabList>
                            </Box>
                            <Button colorScheme="purple" onClick={onOpen}>
                                Добавить закупки
                            </Button>
                        </Box>

                        <TabPanels mt={'-15px'}>
                            <TabPanel height={'100%'} p={0} >
                                <ListTable />
                            </TabPanel>
                            <TabPanel height={'100%'} p={0}>
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
