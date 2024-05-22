import { Box, Button, Input, Select, useDisclosure } from '@chakra-ui/react'
import FactTable from '../components/FactTable'
import FactModal from '../components/AddFactModal'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useApi } from '@/utils/services/axios'
import { useState } from 'react'

interface factInput {
    table: [
        {
            id: number
            name: string
            place: string
            unitOfMeasure: string
            quantity: number
            updatedAt: string
        },
    ]
    totalFact: number
}

interface Place {
    label: string
}

const Fact = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [filters, setFilters] = useState({ name: '', place: '' })

    const { data: factInputData, mutate: mutateFactInput } = useApi<factInput>('factInput', filters)

    const { data: placesData } = useApi<Place[]>('place')

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }))
    }

    const successHandler = () => {
        console.log('success')
        mutateFactInput()
    }

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

                            <Select
                                placeholder="Место"
                                width={'fit-content'}
                                name="name"
                                onChange={handleSelectChange}
                            >
                                {placesData?.map((item, index) => (
                                    <option key={index} value={item.label}>
                                        {item.label}
                                    </option>
                                ))}
                            </Select>
                        </Box>

                        <Button colorScheme="purple" onClick={onOpen}>
                            Добавить факт
                        </Button>
                    </Box>
                    <Box height={'calc(95% - 2.5rem)'} position={'relative'}>
                        <FactTable factInput={factInputData} />
                    </Box>
                </Box>
            </UniversalComponent>
            <FactModal isOpen={isOpen} onClose={onClose} onSuccess={successHandler} />
        </>
    )
}

export default Fact
