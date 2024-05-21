import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Tr, Th, Td, useDisclosure, Box, Select } from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from './EditModal'
import dayjs from 'dayjs'
import { useApi } from '@/utils/services/axios'
import { mutate } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import DateRange from '@/components/DateRange'

interface AllPurchases {
    purchases: Purchase[]
    totalQuantity: number
    totalSum: number
    totalDeliverySum: number
}

interface Purchase {
    id: number
    date: Date
    providerId: number
    rawMaterialId: number
    quantity: number
    price: number
    deliverySum: number
    totalSum: number
    status: string
    provider: {
        id: number
        name: string
    }
    rawMaterial: {
        id: number
        name: string
    }
}

interface RawMaterial {
    id: number
    name: string
    uom: string
}

interface Providers {
    id: number
    name: string
}

const ListTable = () => {
    const { getURLs, getParam, setParam } = useURLParameters()
    const { data: providersData } = useApi<Providers[]>('providers')
    const { data: rawMaterialData } = useApi<RawMaterial[]>('rawMaterials')

    const { data: purchasesData } = useApi<AllPurchases>(`productPurchase?${getURLs().toString()}`)

    const filteredPurchases = purchasesData?.purchases.filter((purchase) => {
        if (getParam('providerId') && Number(getParam('providerId')) !== purchase.provider.id) {
            return false
        }
        return true
    })

    const [selectedData, setSelectedData] = useState<Purchase>()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSelected = (data: Purchase) => {
        setSelectedData(data)
        onOpen()
    }

    const handleUpdateProduct = () => {
        mutate('productPurchase')
    }

    return (
        <>
            <UniversalComponent>
                <Box display={'flex'} justifyContent={'space-between'} mt={3} mb={2}>
                    <Box display={'flex'} gap={'15px'} mb={'5px'}>
                        <DateRange />
                        <Select
                            size={'sm'}
                            borderRadius={4}
                            placeholder="Поставщик"
                            value={getParam('providerId')}
                            onChange={(event) => setParam('providerId', event.target.value)}
                            width={'fit-content'}
                        >
                            {providersData?.map((provider, index) => (
                                <option key={`${index}`} value={provider.id}>
                                    {provider.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            size={'sm'}
                            borderRadius={5}
                            placeholder="Материалы"
                            value={getParam('rawMaterialId')}
                            onChange={(event) => setParam('rawMaterialId', event.target.value)}
                            width={'fit-content'}
                        >
                            {rawMaterialData?.map((units) => (
                                <option key={units.id} value={units.id}>
                                    {units.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Статус"
                            width={'fit-content'}
                            value={getParam('status')}
                            size={'sm'}
                            borderRadius={5}
                            onChange={(e) => setParam('status', e.target.value)}
                        >
                            <option value="Активный">Активный</option>
                            <option value="Неактивный">Неактивный</option>
                        </Select>
                    </Box>
                </Box>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Дата</Th>
                                <Th>Поставщик</Th>
                                <Th>Товар</Th>
                                <Th>Количество</Th>
                                <Th>Цена</Th>
                                <Th>Сумма</Th>
                                <Th>Сумма доставки</Th>
                                <Th>Статус</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredPurchases?.map((purchase) => {
                                return (
                                    <Tr key={purchase.id}>
                                        <Td>{purchase.id}</Td>
                                        <Td>{dayjs(purchase.date).format('DD.MM.YYYY')}</Td>
                                        <Td>{purchase.provider.name}</Td>
                                        <Td>{purchase.rawMaterial.name}</Td>
                                        <Td>{purchase.quantity}</Td>
                                        <Td>{purchase.price}</Td>
                                        <Td>{purchase.totalSum}</Td>
                                        <Td>{purchase.deliverySum}</Td>
                                        <Td>{purchase.status}</Td>
                                        <Td>
                                            <EditIcon
                                                onClick={() => {
                                                    handleSelected(purchase)
                                                }}
                                                boxSize={5}
                                                cursor={'pointer'}
                                            />
                                            <DeleteIcon
                                                color={'red'}
                                                boxSize={5}
                                                cursor={'pointer'}
                                            />
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                                <Td w={'5%'}>ИТОГО</Td>
                                <Td w={'5%'}> </Td>
                                <Td w={'10%'}> </Td>
                                <Td w={'13%'}> </Td>
                                <Td w={'9%'}>{purchasesData?.totalQuantity}</Td>
                                <Td w={'9%'}> </Td>
                                <Td w={'11%'}>{purchasesData?.totalSum}</Td>
                                <Td w={'9%'}>{purchasesData?.totalDeliverySum}</Td>
                                <Td w={'10%'}> </Td>
                                <Td w={'10%'}> </Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
                <EditModal
                    selectedData={selectedData}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={handleUpdateProduct}
                />
            </UniversalComponent>
        </>
    )
}

export default ListTable
