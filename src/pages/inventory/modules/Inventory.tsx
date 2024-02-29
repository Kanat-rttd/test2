import Drawler from '@/components/Drawler'
import { INVENTORY_DETAILS_ROUTE } from '@/utils/constants/routes.consts'
import { Avatar, Box, Button, Input, Select, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import InventoryTable from '../components/InventoryTable'
import EditModal from '../components/Modal'

const Inventory = () => {
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
                        <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                        <Select placeholder="Место">
                            <option value="Лепешечный">Улица</option>
                            <option value="Булочный">Дом</option>
                        </Select>
                        <Select placeholder="Товар">
                            <option value="Лепешечный">Товар 1</option>
                            <option value="Булочный">Дом</option>
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Корректировка
                    </Button>
                </Box>
                <Box>
                    <InventoryTable />
                </Box>
            </Box>

            <EditModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Inventory
