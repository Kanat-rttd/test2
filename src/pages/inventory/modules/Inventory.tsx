import { Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import InventoryTable from '../components/InventoryTable'
import CorrectModal from '../components/Modal'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'

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

const Inventory = () => {
    const { getURLs, setParam, getParam } = useURLParameters()
    const { data: providerGoodsData } = useApi<ProviderGoods[]>('providerGoods')
    const { data: placesData } = useApi<Place[]>('place')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onSuccess = () => {
        console.log('success');
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
                                defaultValue={getParam('name')}
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
                                w={'20%'}
                                size={'sm'}
                                borderRadius={5}
                                defaultValue={getParam('place')}
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
                            Корректировка
                        </Button>
                    </Box>
                    <Box height={'calc(95% - 2.5rem)'} position={'relative'}>
                        <InventoryTable />
                    </Box>
                </Box>
            </UniversalComponent>
            <CorrectModal isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        </>
    )
}

export default Inventory
