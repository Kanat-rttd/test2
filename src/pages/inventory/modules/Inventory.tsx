import { Box, Button, Input, Select, useDisclosure } from '@chakra-ui/react'
import InventoryTable from '../components/InventoryTable'
import CorrectModal from '../components/Modal'
import UniversalComponent from '@/components/ui/UniversalComponent'

const Inventory = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UniversalComponent>
                <Box width={'100%'} height={'94%'} p={5}>
                    <Box
                        marginBottom={10}
                        display={'flex'}
                        justifyContent={'space-between'}
                        height={'5%'}
                    >
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <Input
                                type="date"
                                disabled
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                            <Select placeholder="Товар">
                                <option value="Лепешечный">Товар 1</option>
                                <option value="Булочный">Дом</option>
                            </Select>
                            <Select placeholder="Место">
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
