import { Box, Select, Td, Th, Tr, Tbody, Table } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import DateRange from '../../../components/DateRange'
import dayjs from 'dayjs'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { ShiftAccountingType } from '@/utils/types/shiftAccounting.types'
import { useEffect, useState } from 'react'

// interface DepartPersonal {
//     id: number
//     name: string
//     surname: string
//     status: string
//     userClass: string
//     fixSalary: string
// }

interface BakingFacilityUnit {
    id: number
    facilityUnit: string
}

type FilteredData = {
    date: Date
    personals: {
        personalName: string
        totalQuantity: number
    }[]
}

const VisitView = () => {
    const { getURLs, setParam, getParam } = useURLParameters()

    const { data: visitViewData } = useApi<ShiftAccountingType[]>(
        `shiftAccounting?${getURLs().toString()}`,
    )
    const { data: bakingFacilityUnitData } = useApi<BakingFacilityUnit[]>('mixers')

    const [personalNames, setPersonalNames] = useState<string[]>([])
    const [dates, setDates] = useState<Date[]>([])
    const [filteredData, setFilteredData] = useState<FilteredData[] | undefined>([])

    const getPersonalNames = () => {
        const uniqPersonal = new Set<string>()
        visitViewData?.forEach((shift) => {
            shift.shiftAccountingDetails.forEach((detail) => {
                uniqPersonal.add(detail.departPersonal.name)
            })
        })
        return [...uniqPersonal]
    }

    const getUniqDates = () => {
        const uniqDates = new Set<Date>()
        visitViewData?.forEach((item) => {
            uniqDates.add(item.date)
        })
        return [...uniqDates]
    }

    useEffect(() => {
        setPersonalNames(getPersonalNames())
        setDates(getUniqDates())
    }, [visitViewData])

    const getFilteredData = () => {
        const result: FilteredData[] = []

        const findOrCreateDateEntry = (date: Date) => {
            let entry = result.find((item) => item.date === date)
            if (!entry) {
                entry = { date, personals: [] }
                result.push(entry)
            }
            return entry
        }

        visitViewData?.forEach((item) => {
            const dateEntry = findOrCreateDateEntry(item.date)
            item.shiftAccountingDetails.forEach((detail) => {
                const { name } = detail.departPersonal
                let personalEntry = dateEntry.personals.find(
                    (person) => person.personalName === name,
                )
                if (!personalEntry) {
                    personalEntry = { personalName: name, totalQuantity: 0 }
                    dateEntry.personals.push(personalEntry)
                }
                personalEntry.totalQuantity += detail.shiftTime
            })
        })

        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        return result
    }

    useEffect(() => {
        setFilteredData(getFilteredData())
    }, [personalNames, dates])

    const getColumnTotal = (productName: string) => {
        return visitViewData?.reduce((total, item) => {
            const product = item.shiftAccountingDetails.find(
                (product) => product.departPersonal.name === productName,
            )
            return total + (Number(product?.shiftTime) || 0)
        }, 0)
    }

    return (
        <Box>
            <Box width='100%' height='100%' p={5} mt={1}>
                <Box marginBottom={6} display='flex' justifyContent='space-between'>
                    <Box display='flex' gap='15px' width='100%'>
                        <DateRange />
                        <Select
                            size='sm'
                            borderRadius={5}
                            width='fit-content'
                            value={getParam('facilityUnit')}
                            onChange={(e) => setParam('facilityUnit', e.target.value)}
                        >
                            <option value=''>Все заводы</option>
                            {bakingFacilityUnitData?.map(({ id, facilityUnit }) => (
                                <option key={id} value={id}>
                                    {facilityUnit}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Box>
                <Box>
                    <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Дата</Th>
                                    {personalNames.map((personalName, index) => (
                                        <Th key={index} textAlign='center'>
                                            {personalName}
                                        </Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredData?.length ? (
                                    filteredData?.map((entry, index) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{dayjs(entry.date).format('DD.MM.YYYY')}</Td>
                                            {personalNames.map((name, indx) => (
                                                <Td key={indx} textAlign='center'>
                                                    {entry.personals.find(
                                                        (person) => person.personalName === name,
                                                    )?.totalQuantity || 0}
                                                </Td>
                                            ))}
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td>Нет данных</Td>
                                    </Tr>
                                )}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th color='#000' fontSize={15} fontWeight='bold'>
                                        Итого
                                    </Th>
                                    <Th></Th>
                                    {personalNames.map((personalName, productIndex) => (
                                        <Th
                                            fontSize={15}
                                            color='#000'
                                            key={productIndex}
                                            textAlign='center'
                                        >
                                            {getColumnTotal(personalName)}
                                        </Th>
                                    ))}
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default VisitView
