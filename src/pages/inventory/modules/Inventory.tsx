import { Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import InventoryTable from '../components/InventoryTable'
import CorrectModal from '../components/Modal'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import DateRange from '@/components/DateRange'

const Inventory = () => {
    const { getURLs, setParam, getParam } = useURLParameters()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UniversalComponent>
                <Box width={'100%'} height={'94%'} p={5} mt={2}>
                    <Box
                        marginBottom={8}
                        display={'flex'}
                        justifyContent={'space-between'}
                        height={'5%'}
                    >
                        <Box display={'flex'} gap={'15px'} width={'fit-content'} w={'100%'}>
                            <DateRange />
                            <Select
                                placeholder="Товар"
                                w={'20%'}
                                size={'sm'}
                                borderRadius={5}
                                defaultValue={getParam('name')}
                                onChange={(e) => {
                                    setParam('name', e.target.value)
                                }}
                            >
                                <option value="Лепешечный">Товар 1</option>
                                <option value="Булочный">Дом</option>
                            </Select>
                            <Select
                                placeholder="Место"
                                w={'20%'}
                                size={'sm'}
                                borderRadius={5}
                                defaultValue={getParam('place')}
                                onChange={(e) => {
                                    setParam('place', e.target.value)
                                }}
                            >
                                <option value="Лепешечный">Улица</option>
                                <option value="Булочный">Дом</option>
                            </Select>
                        </Box>

                        <Button colorScheme="purple" onClick={onOpen}>
                            Корректировка
                        </Button>
                    </Box>
                    <Box height={'calc(95% - 2.5rem)'} position={'relative'}>
                        <InventoryTable />
                    </Box>
                </Box>
            </UniversalComponent>
            <CorrectModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Inventory
