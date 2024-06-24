import { Box, Select } from '@chakra-ui/react'
import ListTable from '../components/ListTable'
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

interface FacilityUnit {
    id: number
    facilityUnit: string
}

interface Client {
    id: number
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

interface Product {
    id: number
    name: string
    price: number
    costPrice: number
    status: number
    bakingFacilityUnit: {
        facilityUnit: string
        id: number
    }
}

const JournalPage = () => {
    const { setParam, getParam } = useURLParameters()
    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')
    const { data: clientsData } = useApi<Client[]>('client')
    const { data: productData } = useApi<Product[]>('product')

    console.log('test')

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
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRange />
                        <Select
                            placeholder="Цех"
                            width={'90%'}
                            size={'sm'}
                            borderRadius={5}
                            value={getParam('facilityUnit')}
                            onChange={(e) => setParam('facilityUnit', e.target.value)}
                        >
                            {facilityUnitsData?.map((unit, index) => (
                                <option key={index} value={unit.id}>
                                    {unit.facilityUnit}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Реализатор"
                            width={'90%'}
                            size={'sm'}
                            borderRadius={5}
                            onChange={(e) => setParam('client', e.target.value)}
                        >
                            {clientsData?.map((client, index) => (
                                <option key={index} value={client.name}>
                                    {client.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Продукт"
                            width={'90%'}
                            size={'sm'}
                            borderRadius={5}
                            onChange={(e) => setParam('product', e.target.value)}
                        >
                            {productData?.map((product, index) => (
                                <option key={index} value={product.name}>
                                    {product.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Box>
                <Box position={'relative'}>
                    <ListTable />
                </Box>
            </Box>
            {/* <DistributionModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} status="0" /> */}
        </>
    )
}

export default JournalPage
