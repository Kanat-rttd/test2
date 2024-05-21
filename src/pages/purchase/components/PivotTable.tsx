import DateRange from '@/components/DateRange'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { Box, Select, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react'

// interface Purchase {
//     id: number
//     date: Date
//     providerId: number
//     rawMaterialId: number
//     quantity: number
//     price: number
//     deliverySum: number
//     totalSum: number
//     status: string
//     provider: {
//         id: number
//         name: string
//     }
//     rawMaterial: {
//         id: number
//         name: string
//     }
// }

interface RawMaterial {
    id: number
    name: string
    uom: string
}

interface Providers {
    id: number
    name: string
}

const PivotTable = () => {
    const { getParam, setParam } = useURLParameters()
    const { data: providersData } = useApi<Providers[]>('providers')
    const { data: rawMaterialData } = useApi<RawMaterial[]>('rawMaterials')
    const data = [
        {
            id: 1,
            item: 'Мука',
            qty: '50кг',
            deliveryCost: 200,
            totalSum: 6200,
        },
        {
            id: 2,
            item: 'Маечки',
            qty: '25 рулон',
            deliveryCost: 400,
            totalSum: 5400,
        },
    ]

    return (
        <Box width={'100%'}>
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
                            <option key={index} value={provider.id}>
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
                        {rawMaterialData?.map((units, index) => (
                            <option key={index} value={units.id}>
                                {units.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            </Box>
            <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Товар</Th>
                            <Th>Количество</Th>
                            <Th>Сумма доставки</Th>
                            <Th>Сумма</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((purchase) => {
                            return (
                                <Tr key={purchase.id}>
                                    <Td>{purchase.id}</Td>
                                    <Td>{purchase.item}</Td>
                                    <Td>{purchase.qty}</Td>
                                    <Td>{purchase.deliveryCost}</Td>
                                    <Td>{purchase.totalSum}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                            <Td w={'15%'}>ИТОГО</Td>
                            <Td w={'17%'}></Td>
                            <Td w={'25%'}>50000</Td>
                            <Td w={'30%'}>50000</Td>
                            <Td w={'30%'}>5000</Td>
                            <Td> </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PivotTable
