import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react'
import ListTable from '../components/ListTable.1'
import PivotTable from '../components/PivotTable'
import DistributionModal from '../components/DistributionModal'
import { useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { DispatchType } from '@/utils/types/dispatch.types'

type Dispatch = {
    data: DispatchType[]
    totalPrice: number
    totalQuantity: number
}

const Distribution = () => {
    const { getURLs } = useURLParameters()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutate: mutateDispatchesData } = useApi<Dispatch>(`release?${getURLs().toString()}`)

    const handleUpdateProduct = () => {
        mutateDispatchesData()
    }

    return (
        <Box>
            <Box width={'100%'} height={'100%'} p={5} mt={1}>
                <Box>
                    <Tabs variant="soft-rounded" height={'100%'}>
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
            <DistributionModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                onSuccess={handleUpdateProduct}
                status="0"
            />
        </Box>
    )
}

export default Distribution
