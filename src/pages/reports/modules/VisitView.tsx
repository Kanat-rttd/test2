import { Box, Select, Td, Th, Tr, Tbody, Table } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import DateRange from '../../../components/DateRange'
import dayjs from 'dayjs'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Thead } from '@/components/ui'

interface visitViewData {
    Date: string
    personalId: number
    personalName: string
    totalHours: string
}

interface DepartPersonal {
    id: number
    name: string
    surname: string
    status: string
    userClass: string
    fixSalary: string
}

const VisitView = () => {
    const { getURLs, setParam, getParam } = useURLParameters()

    const { data: visitViewData } = useApi<visitViewData[]>(`reports/time?${getURLs().toString()}`)
    const { data: departPersonalData } = useApi<DepartPersonal[]>('departPersonal')

    console.log(visitViewData)

    const getPersonalNames = () => {
        const personalNames = new Set<string>()
        visitViewData?.forEach((entry) => {
            personalNames.add(entry.personalName)
        })
        return [...personalNames]
    }

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setParam('personalName', event.target.value)
    }

    const personalNames = getPersonalNames()

    const groupedDataByDate: { [key: string]: visitViewData[] } = {}
    visitViewData?.forEach((item) => {
        if (!groupedDataByDate[item.Date]) {
            groupedDataByDate[item.Date] = []
        }
        groupedDataByDate[item.Date].push(item)
    })

    return (
        <Box>
            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'100%'}>
                        <DateRange />
                        <Select
                            width={'fit-content'}
                            value={getParam('personalName')}
                            onChange={handleClientChange}
                        >
                            <option value="">Все клиенты</option>
                            {departPersonalData?.map((personal) => (
                                <option key={personal.id} value={personal.name}>
                                    {personal.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Box>
                <Box>
                    <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Дата</Th>
                                    {[...personalNames].map((personalName, index) => (
                                        <Th key={index}>{personalName}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Object.keys(groupedDataByDate).map((date, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{dayjs(date).format('DD.MM.YYYY')}</Td>
                                        {[...personalNames].map((personalName, innerIndex) => (
                                            <Td key={innerIndex}>
                                                {groupedDataByDate[date].find(
                                                    (data) => data.personalName === personalName,
                                                )?.totalHours || ''}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default VisitView
