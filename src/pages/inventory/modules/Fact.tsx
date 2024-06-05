import { Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import FactTable from '../components/FactTable'
import FactModal from '../components/AddFactModal'
import { useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { FactInputType } from '@/utils/types/factInput.types'
import { ProviderGoodsType } from '@/utils/types/providerGoog.types'

interface Place {
    label: string
}

const Fact = () => {
    const { getURLs, setParam, getParam } = useURLParameters()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { mutate: mutateFactInput } = useApi<FactInputType>(`factInput?${getURLs().toString()}`)

    const { data: providerGoodsData } = useApi<ProviderGoodsType[]>('providerGoods')
    const { data: placesData } = useApi<Place[]>('place')

    const successHandler = () => {
        console.log('success')
        mutateFactInput()
    }

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                maxHeight={'calc(95% - 2.5rem)'}
                height="100vh"
                p={5}
                mt={2}
            >
                <Box marginBottom={4} display={'flex'} justifyContent={'space-between'}>
                    <Box width={'100%'} display={'flex'} gap={'15px'}>
                        <Select
                            placeholder="Товар"
                            w={'20%'}
                            size={'sm'}
                            borderRadius={5}
                            value={getParam('productId')}
                            onChange={(e) => {
                                setParam('productId', e.target.value)
                            }}
                        >
                            {providerGoodsData?.map((item, index) => (
                                <option key={index} value={item.id}>
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
                <Box position={'relative'}>
                    <FactTable />
                </Box>
            </Box>
            <FactModal isOpen={isOpen} onClose={onClose} onSuccess={successHandler} />
        </>
    )
}

export default Fact
