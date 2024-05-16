import { Box, Button, Select } from '@chakra-ui/react'
import { useState } from 'react'
import {
    SELLS_INVOICE_ROUTE,
    SELLS_DEBT_ACCOUNTING_ROUTE,
    SELLS_DEBT_TRANSFER_ROUTE,
} from '@/utils/constants/routes.consts'
import ListTable from '../components/ListTable'
import { useNavigate } from 'react-router-dom'
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'

import UniversalComponent from '@/components/ui/UniversalComponent'
import Header from '@/components/layout/Header'
// import { useURLParameters } from '@/utils/hooks/useURLParameters'

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
    // Данные выбора даты
    // const {getURLs, getParam} = useURLParameters()
    const navigate = useNavigate()

    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')
    const { data: clientsData } = useApi<Client[]>('client')
    const { data: productData } = useApi<Product[]>('product')

    // console.log(facilityUnitsData, clientsData, productData)

    const [selectedFacilityUnit, setFacilityUnit] = useState('')
    const [selectedClient, setClient] = useState('')
    const [selectedProduct, setProduct] = useState('')

    console.log(selectedFacilityUnit, selectedClient, selectedProduct)

    return (
        <>
            <UniversalComponent>
                <Header>
                    <Button height={'100%'} width={'20%'} bg={'rgba(217, 217, 217, 1)'}>
                        Журнал Продаж
                    </Button>
                    <Button
                        onClick={() => navigate(SELLS_INVOICE_ROUTE)}
                        height={'100%'}
                        width={'20%'}
                    >
                        Накладной
                    </Button>
                    <Button
                        onClick={() => navigate(SELLS_DEBT_ACCOUNTING_ROUTE)}
                        height={'100%'}
                        width={'20%'}
                    >
                        Учёт долгов
                    </Button>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(SELLS_DEBT_TRANSFER_ROUTE)}
                    >
                        Перевод долга
                    </Button>
                </Header>

                <Box
                    display="flex"
                    flexDirection="column"
                    maxHeight={'calc(95% - 2.5rem)'}
                    height="100vh"
                    p={5}
                >
                    <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            {/* <DateRangePicker></DateRangePicker> */}
                            <DateRange />
                            <Select
                                placeholder="Цехи"
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
            </UniversalComponent>
        </>
    )
}

export default JournalPage
