import Drawler from '@/components/Drawler'
import { INVENTORY_DETAILS_ROUTE, INVENTORY_FACT_ROUTE } from '@/utils/constants/routes.consts'
import { Avatar, Box, Button, Input, Select, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import FactTable from '../components/FactTable'

const Fact = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
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
                </Box>
                <Avatar size={'md'} bg="teal.500" />
            </Box>

            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        {/*  */}
                        {/* Это не фильтр по дате, а для удобства пользователей */}
                        <Input
                            type="date"
                            disabled
                            defaultValue={new Date().toISOString().split('T')[0]}
                        />
                        {/*  */}
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
                <Box>
                    <FactTable />
                </Box>
            </Box>
        </>
    )
}

export default Fact
