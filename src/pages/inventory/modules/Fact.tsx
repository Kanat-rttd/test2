import { Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import FactTable from '../components/FactTable'
import FactModal from '../components/AddFactModal'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useApi } from '@/utils/services/axios'
import DateRange from '@/components/DateRange'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

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

interface ProviderGoods {
    id: number
    providerId: number
    goods: string
    unitOfMeasure: string
    place: { label: string }[]
    status: string
    provider: {
        id: number
        name: string
    }
}

interface Place {
    label: string
}

const Fact = () => {
    const { getURLs, setParam, getParam } = useURLParameters()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { mutate: mutateFactInput } = useApi<factInput>(
        `factInput?${getURLs().toString()}`,
    )

    const { data: providerGoodsData } = useApi<ProviderGoods[]>('providerGoods')
    const { data: placesData } = useApi<Place[]>('place')

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
                            <DateRange />
                            <Select
                                placeholder="Товар"
                                w={'20%'}
                                size={'sm'}
                                borderRadius={5}
                                value={getParam('name')}
                                onChange={(e) => {
                                    setParam('name', e.target.value)
                                }}
                            >
                                {providerGoodsData?.map((item, index) => (
                                    <option key={index} value={item.goods}>
                                        {item.goods}
                                    </option>
                                ))}
                            </Select>

                            <Select
                                placeholder="Место"
                                width={'fit-content'}
                                w={'20%'}
                                size={'sm'}
                                borderRadius={5}
                                value={getParam('place')}
                                onChange={(e) => {
                                    setParam('place', e.target.value)
                                }}
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
                        <FactTable />
                    </Box>
                </Box>
            </UniversalComponent>
            <FactModal isOpen={isOpen} onClose={onClose} onSuccess={successHandler} />
        </>
    )
}

export default Fact
