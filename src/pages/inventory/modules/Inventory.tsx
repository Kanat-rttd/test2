import { Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import InventoryTable from '../components/InventoryTable'
import CorrectModal from '../components/Modal'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { ProviderGoodsType } from '@/utils/types/providerGoog.types'

const Inventory = () => {
    const { setParam, getParam } = useURLParameters()
    const { data: providerGoodsData } = useApi<ProviderGoodsType[]>('providerGoods')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onSuccess = () => {
        console.log('success')
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
                <Box marginBottom={6} display={'flex'} justifyContent={'space-between'}>
                    <Box width={'100%'} display={'flex'} gap={'15px'}>
                        <Select
                            placeholder="Товар"
                            w={'20%'}
                            size={'sm'}
                            borderRadius={5}
                            defaultValue={getParam('productId')}
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
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Корректировка
                    </Button>
                </Box>
                <Box position={'relative'}>
                    <InventoryTable />
                </Box>
            </Box>

            <CorrectModal isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        </>
    )
}

export default Inventory
