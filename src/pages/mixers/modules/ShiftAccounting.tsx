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
import DistributionModal from '../components/DistributionModal'
import PivotTable from '../components/PivotTable'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

export default function ShiftAccounting() {
    const { setParam } = useURLParameters()
    const handleSuccess = () => {
        console.log('1')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const clearParam = () => {
        setParam('facilityUnit', '')
    }

    return (
        <Box mt={1}>
            <Tabs variant="soft-rounded" height={'100%'} mt={'-10px'}>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <TabList height={'22px'}>
                            <Tab onClick={clearParam}>List</Tab>
                            <Tab onClick={clearParam}>Pivot</Tab>
                        </TabList>
                        <Button colorScheme="purple" onClick={onOpen}>
                            Добавить часы
                        </Button>
                    </Box>
                    <TabPanels height={'100%'}>
                        <TabPanel height={'100%'} p={'10px 0'}>
                            <ListTable status="1" />
                        </TabPanel>
                        <TabPanel p={'10px 0'}>
                            <PivotTable />
                        </TabPanel>
                    </TabPanels>
                </Box>
            </Tabs>
            <DistributionModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                onSuccess={handleSuccess}
                data={undefined}
            />
        </Box>
    )
}