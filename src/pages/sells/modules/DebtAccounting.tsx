import { Box, Button, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import {
    SELLS_JOURNAL_ROUTE,
    SELLS_INVOICE_ROUTE,
    SELLS_DEBT_TRANSFER_ROUTE,
} from '@/utils/constants/routes.consts'
import MagazineTable from '../components/MagazineTable'
import ProviderTable from '../components/ProviderTable'

import { useNavigate } from 'react-router-dom'
import Header from '@/components/layout/Header'

const DebtAccounting = () => {
    const navigate = useNavigate()

    return (
        <>
            <Box>
                <Header>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(SELLS_JOURNAL_ROUTE)}
                    >
                        Журнал Продаж
                    </Button>
                    <Button
                        onClick={() => navigate(SELLS_INVOICE_ROUTE)}
                        height={'100%'}
                        width={'20%'}
                    >
                        Накладной
                    </Button>
                    <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                        Учёт долгов
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(SELLS_DEBT_TRANSFER_ROUTE)}
                    >
                        Перевод долга
                    </Button>
                </Header>
                <Box width={'100%'} height={'100%'}>
                    <Tabs variant="soft-rounded" colorScheme="green">
                        <TabList justifyContent={'right'} pt={3} mb={-12}>
                            <Tab>Реализаторы</Tab>
                            <Tab>Магазины</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ProviderTable />
                            </TabPanel>
                            <TabPanel>
                                <MagazineTable />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </>
    )
}

export default DebtAccounting
