import DateRangePicker from '@/components/DateRangePicker'
import Drawler from '@/components/Menu'
import { Avatar, Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import ListTable from '../components/ListTable'
import DistributionModal from '../components/DistributionModal'

const shiftAccounting = () => {
    const handleSuccess = () => {
        console.log('1')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
                    <Button height={'100%'} width={'20%'} bg={'rgba(217, 217, 217, 1)'}>
                        Учёт смен
                    </Button>
                </Box>
                <Avatar size={'md'} bg="teal.500" />
            </Box>

            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRangePicker></DateRangePicker>
                        <Select placeholder="Цехи" width={'fit-content'}>
                            <option value="Лепешечный">Лепешечный</option>
                            <option value="Булочный">Булочный</option>
                            <option value="Заварной">Заварной</option>
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Добавить часы
                    </Button>
                </Box>
                <Box>
                    <ListTable status="1" />
                </Box>
            </Box>
            <DistributionModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                onSuccess={handleSuccess}
                status="1"
            />
        </Box>
    )
}

export default shiftAccounting
