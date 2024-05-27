import DateRange from '@/components/DateRange'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { DepartPersonalType } from '@/utils/types/departPersonal.types'
import { FacilityUnit } from '@/utils/types/product.types'
import { ShiftAccountingType } from '@/utils/types/shiftAccounting.types'
import { Box, Select, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs'

interface PivotTableProps {
    shiftAccounting: ShiftAccountingType[] | undefined
}

const PivotTable = ({ shiftAccounting }: PivotTableProps) => {
    const { getParam, setParam } = useURLParameters()
    const { data: departPersonalData } = useApi<DepartPersonalType[]>('departPersonal')
    const { data: facilityUnits } = useApi<FacilityUnit[] | undefined>(`mixers`)

    const uniqPersonal = new Set<string>()
    shiftAccounting?.forEach((shift) => {
        shift.shiftAccountingDetails.forEach((detail) => {
            uniqPersonal.add(detail.departPersonal.name)
        })
    })

    const getColumnTotal = (productName: string) => {
        return shiftAccounting?.reduce((total, item) => {
            const product = item.shiftAccountingDetails.find(
                (product) => product.departPersonal.name === productName,
            )
            return total + (Number(product?.shiftTime) || 0)
        }, 0)
    }

    return (
        <Box width={'100%'}>
            <Box display={'flex'} justifyContent={'space-between'} mt={-3} mb={2}>
                <Box display={'flex'} gap={'15px'} mb={'5px'}>
                    <DateRange />
                    <Select
                        size={'sm'}
                        borderRadius={4}
                        placeholder="Сотрудники"
                        value={getParam('personal')}
                        onChange={(event) => setParam('personal', event.target.value)}
                        width={'fit-content'}
                    >
                        {departPersonalData?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Select
                        size={'sm'}
                        borderRadius={5}
                        placeholder="Цех"
                        width={'fit-content'}
                        defaultValue={getParam('facilityUnit')}
                        onChange={(e) => setParam('facilityUnit', e.target.value)}
                    >
                        {facilityUnits?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.facilityUnit}
                            </option>
                        ))}
                    </Select>
                </Box>
            </Box>
            <TableContainer style={{ width: '100%', overflowY: 'auto' }}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th w={'5%'}>№</Th>
                            <Th w={'20%'}>дата</Th>
                            {Array.from(uniqPersonal).map((name, index) => (
                                <Th textAlign={'center'} key={index}>
                                    {name}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {shiftAccounting?.map((item, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{dayjs(item.date).format('DD.MM.YYYY')}</Td>
                                {Array.from(uniqPersonal).map((productName, productIndex) => (
                                    <Td width={'20%'} textAlign={'center'} key={productIndex}>
                                        {item.shiftAccountingDetails.find(
                                            (prod) => prod.departPersonal.name === productName,
                                        )?.shiftTime || ''}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                            <Th w={'15%'}>Итого</Th>
                            {Array.from(uniqPersonal).map((productName, productIndex) => (
                                <Th
                                    fontSize={15}
                                    color={'#000'}
                                    width={'25%'}
                                    textAlign={'center'}
                                    key={productIndex}
                                >
                                    {getColumnTotal(productName)}
                                </Th>
                            ))}
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PivotTable
