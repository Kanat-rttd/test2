import {
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
} from '@chakra-ui/react'
import ListTable from '../components/ListTable.1'
import PivotTable from '../components/PivotTable'
import DistributionModal from '../components/DistributionModal'

const Refund = () => {
    const handleSuccess = () => {
        console.log('1')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
                <Box width={'100%'} height={'100%'} p={5}  mt={1}>
                    <Box>
                        <Tabs variant="soft-rounded">
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
