import { Box, Button, Input, Select, useDisclosure } from '@chakra-ui/react'
import FactTable from '../components/FactTable'
import FactModal from '../components/AddFactModal'
import UniversalComponent from '@/components/ui/UniversalComponent'

const Fact = () => {
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
                            <Input
                                w={'20%'}
                                size={'sm'}
                                borderRadius={5}
                                type="date"
                                disabled
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                            <Select placeholder="Товар" w={'20%'} size={'sm'} borderRadius={5}>
                                <option value="Лепешечный">Товар 1</option>
                                <option value="Булочный">Дом</option>
                            </Select>
                            <Select placeholder="Место" w={'20%'} size={'sm'} borderRadius={5}>
                                <option value="Лепешечный">Улица</option>
                                <option value="Булочный">Дом</option>
                            </Select>
                        </Box>

                        <Button colorScheme="purple" onClick={onOpen}>
                            Добавить факт
                        </Button>
                    </Box>
                    <Box height={'calc(95% - 2.5rem)'} position={'relative'}>
                        <FactTable />
                    </Box>
                </Box>
            </UniversalComponent>
            <FactModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Fact
