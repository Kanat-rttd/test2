import IsMobile from '@/utils/helpers/isMobile'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Arrival from '../components/Arrival'
import Consumption from '../components/Consumption'
import Transfer from '../components/Transfer'
// import Drawler from '@/components/Menu'

const Input = () => {
    return (
        <>
            {/* <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                alignItems={'center'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
                height={'60px'}
                p={'0 1rem'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
                </Box>
                <Avatar bg="teal.500" />
            </Box> */}
            <Box display={'flex'} width={'100%'} justifyContent={'center'} marginTop={3}>
                <Box
                    height={'100%'}
                    width={IsMobile() ? '100%' : '25%'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'30px'}
                >
                    <Box
                        background={'white'}
                        borderRadius={'5px'}
                        boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
                    >
                        <Tabs>
                            <TabList justifyContent={'center'}>
                                <Tab>Приход</Tab>
                                <Tab>Расход</Tab>
                                <Tab>Перевод</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel display={'flex'} flexDirection={'column'} gap={'15px'}>
                                    <Arrival />
                                </TabPanel>
                                <TabPanel display={'flex'} flexDirection={'column'} gap={'15px'}>
                                    <Consumption />
                                </TabPanel>
                                <TabPanel display={'flex'} flexDirection={'column'} gap={'15px'}>
                                    <Transfer />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Input
