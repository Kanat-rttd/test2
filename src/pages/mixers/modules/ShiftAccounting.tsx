import { Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import ListTable from '../components/ListTable'
import DistributionModal from '../components/DistributionModal'
import DateRange from '@/components/DateRange'

const shiftAccounting = () => {
    const handleSuccess = () => {
        console.log('1')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRange />
                        <Select size={'sm'} borderRadius={5} placeholder="Цехи" width={'fit-content'}>
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
