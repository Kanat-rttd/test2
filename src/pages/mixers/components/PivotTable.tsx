import DateRange from '@/components/DateRange'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { DepartPersonalType } from '@/utils/types/departPersonal.types'
import { FacilityUnit } from '@/utils/types/product.types'
import { ShiftAccountingType } from '@/utils/types/shiftAccounting.types'
import { Box, Select, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react'

const PivotTable = () => {
    const { getParam, setParam } = useURLParameters()
    const { data: departPersonalData } = useApi<DepartPersonalType[]>('departPersonal')
    const { data: facilityUnits } = useApi<FacilityUnit[] | undefined>(`mixers`)
    const { data: shiftAccounting } = useApi<ShiftAccountingType[]>('shiftAccounting')

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
                            <Th w={'20%'}>дата</Th>
                            {departPersonalData?.map((item) => {
                                return <Th key={item.id}>{item.name}</Th>
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            {shiftAccounting?.map((item) => {
                                return <Th key={item.id}>{}</Th>
                            })}
                            <Td></Td>
                            <Td></Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                            <Td w={'15%'}>ИТОГО</Td>
                            <Td></Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PivotTable
