import { INVENTORY_DETAILS_ROUTE, INVENTORY_FACT_ROUTE } from '@/utils/constants/routes.consts'
import { Box, Button, Input, Select, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import FactTable from '../components/FactTable'
import FactModal from '../components/AddFactModal'
import UniversalComponent from '@/components/ui/UniversalComponent'
import Header from '@/components/layout/Header'

const Fact = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UniversalComponent>
                <Header>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        bg={'rgba(217, 217, 217, 1)'}
                        onClick={() => navigate(INVENTORY_FACT_ROUTE)}
                    >
                        Ввод факт
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        // bg={'rgba(217, 217, 217, 1)'}
                        onClick={() => navigate(INVENTORY_DETAILS_ROUTE)}
                    >
                        Инвентаризация
                    </Button>
                </Header>

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
