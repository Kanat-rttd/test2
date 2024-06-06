import { Box, Button, Select, useDisclosure } from '@chakra-ui/react'
import ListTable from '../components/ListTable'
import PurchaseModal from '../components/PurchaseModal'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import DateRange from '@/components/DateRange'
import { ProviderGoodsType } from '@/utils/types/providerGoog.types'
import { ProviderType } from '@/utils/types/provider.types'
import { PurchaseType } from '@/utils/types/purchase.types'

interface AllPurchases {
    purchases: PurchaseType[]
    totalQuantity: number
    totalSum: number
    totalDeliverySum: number
}

const Products = () => {
    const { getParam, setParam, getURLs } = useURLParameters()
    const { data: providersData } = useApi<ProviderType[]>('providers')
    const { data: providerGoodsData } = useApi<ProviderGoodsType[]>('providerGoods')

    const { data: purchasesData, mutate: mutatePurchaseData } = useApi<AllPurchases>(
        `productPurchase?${getURLs().toString()}`,
    )

    const handleAddProduct = () => {
        mutatePurchaseData()
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box width={'100%'} p={5} pt={7}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={5}>
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
                                <option key={`${index}`} value={provider.id}>
                                    {provider.providerName}
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
                <ListTable purchasesData={purchasesData} mutate={mutatePurchaseData} />
            </Box>
            <PurchaseModal isOpen={isOpen} onClose={onClose} onSuccess={handleAddProduct} />
        </>
    )
}

export default Products
