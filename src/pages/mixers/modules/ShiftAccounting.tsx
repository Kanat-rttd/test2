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
import { ShiftAccountingType } from '@/utils/types/shiftAccounting.types'
import { useApi } from '@/utils/services/axios'

export default function ShiftAccounting() {
    const { getURLs } = useURLParameters()

    const { data: shiftAccounting, mutate: mutateShiftAccountingData } = useApi<
        ShiftAccountingType[]
    >(`shiftAccounting?${getURLs().toString()}`)

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box mt={1}>
            <Tabs variant='soft-rounded' height='100%' mt='-10px'>
                <Box width='100%' height='100%' p={5}>
                    <Box display='flex' justifyContent='space-between'>
                        <TabList height='22px'>
                            <Tab>List</Tab>
                            <Tab>Pivot</Tab>
                        </TabList>
                        <Button colorScheme='purple' onClick={onOpen}>
                            Добавить часы
                        </Button>
                    </Box>
                    <TabPanels height='100%'>
                        <TabPanel height='100%' p='10px 0'>
                            <ListTable
                                shiftAccounting={shiftAccounting}
                                mutate={mutateShiftAccountingData}
                            />
                        </TabPanel>
                        <TabPanel p='10px 0'>
                            <PivotTable shiftAccounting={shiftAccounting} />
                        </TabPanel>
                    </TabPanels>
                </Box>
            </Tabs>
            <DistributionModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                onSuccess={mutateShiftAccountingData}
                data={undefined}
            />
        </Box>
    )
}
