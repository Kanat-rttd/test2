import { Box, Select } from '@chakra-ui/react'
import { useState } from 'react'
import ListTable from '../components/ListTable'
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'

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
    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')
    const { data: clientsData } = useApi<Client[]>('client')
    const { data: productData } = useApi<Product[]>('product')

    const [selectedFacilityUnit, setFacilityUnit] = useState('')
    const [selectedClient, setClient] = useState('')
    const [selectedProduct, setProduct] = useState('')

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
                        {/* <DateRangePicker></DateRangePicker> */}
                        <DateRange />
                        <Select
                            placeholder="Цех"
                            width={'90%'}
                            size={'sm'}
                            borderRadius={5}
                            onChange={(e) => setFacilityUnit(e.target.value)}
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
                            onChange={(e) => setClient(e.target.value)}
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
                            onChange={(e) => setProduct(e.target.value)}
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
                    <ListTable
                        facilityUnit={selectedFacilityUnit}
                        client={selectedClient}
                        product={selectedProduct}
                        status="0"
                    />
                </Box>
            </Box>
            {/* <DistributionModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} status="0" /> */}
        </>
    )
}

export default JournalPage
