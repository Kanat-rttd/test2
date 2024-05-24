import { Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import ListTable from '../components/ListTable'
import PurchaseModal from '../components/PurchaseModal'
import { mutate } from 'swr'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import DateRange from '@/components/DateRange'
import { ProviderGoodsType } from '@/utils/types/providerGoog.types'

interface Providers {
    value: number
    label: string
}

const Products = () => {
    const { getParam, setParam } = useURLParameters()
    const { data: providersData } = useApi<Providers[]>('providers')
    const { data: providerGoodsData } = useApi<ProviderGoodsType[]>('providerGoods')

    const handleAddProduct = () => {
        mutate('productPurchase')
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UniversalComponent>
                <Box width={'100%'} height={'calc(100vh-64px)'} p={5} pt={7}>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        mb={5}
                    >
                        <Box display={'flex'} gap={'15px'} mb={'5px'}>
                            <DateRange />
                            <Select
                                size={'sm'}
                                borderRadius={5}
                                placeholder="Поставщик"
                                value={getParam('providerId')}
                                onChange={(event) => setParam('providerId', event.target.value)}
                                width={'fit-content'}
                            >
                                {providersData?.map((provider, index) => (
                                    <option key={`${index}`} value={provider.value}>
                                        {provider.label}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                size={'sm'}
                                borderRadius={5}
                                placeholder="Товар"
                                value={getParam('rawMaterialId')}
                                onChange={(event) => setParam('rawMaterialId', event.target.value)}
                                width={'fit-content'}
                            >
                                {providerGoodsData?.map((units) => (
                                    <option key={units.id} value={units.id}>
                                        {units.goods}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                placeholder="Статус"
                                width={'fit-content'}
                                value={getParam('paymentStatus')}
                                size={'sm'}
                                borderRadius={5}
                                onChange={(e) => setParam('paymentStatus', e.target.value)}
                            >
                                <option value="Оплачено">Оплачено</option>
                                <option value="Не оплачено">Не оплачено</option>
                            </Select>
                        </Box>
                        <Button colorScheme="purple" onClick={onOpen}>
                            Добавить закупки
                        </Button>
                    </Box>
                    <ListTable />
                </Box>
                <PurchaseModal isOpen={isOpen} onClose={onClose} onSuccess={handleAddProduct} />
            </UniversalComponent>
        </>
    )
}

export default Products
