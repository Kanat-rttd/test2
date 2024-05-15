import { useState, useEffect } from 'react'
import {
    BREAD_REPORT_ROUTE,
    RELEASE_REPORT_ROUTE,
    VISIT_REPORT_ROUTE,
    RECONCILIATION_REPORT_ROUTE,
} from '@/utils/constants/routes.consts'
import {
    Box,
    Button,
    Select,
    TableContainer,
    Td,
    Th,
    Tr,
    Tbody,
    Thead,
    Table,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@/utils/services/axios'
import DateRange from '../../../components/DateRange'
import dayjs from 'dayjs'
import Header from '@/components/Header'

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
    const navigate = useNavigate()

    const [selectedPersonal, setSelectedPersonal] = useState('')

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    const { data: visitViewData } = useApi<visitViewData[]>('reports/time', {
        startDate: String(selectionRange.startDate),
        endDate: String(selectionRange.endDate),
        personalName: selectedPersonal,
    })
    const { data: departPersonalData } = useApi<DepartPersonal[]>('departPersonal')

    console.log(visitViewData)

    const getPersonalNames = () => {
        const personalNames = new Set<string>()
        visitViewData?.forEach((entry) => {
            personalNames.add(entry.personalName)
        })
        return [...personalNames]
    }

    useEffect(() => {
        console.log(selectionRange.startDate)
        console.log(selectionRange.endDate)
    }, [selectionRange])

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPersonal(event.target.value)
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
            <Header>
                <Button height={'100%'} width={'25%'} onClick={() => navigate(BREAD_REPORT_ROUTE)}>
                    Отчёт по продукции
                </Button>
                <Button
                    height={'100%'}
                    width={'25%'}
                    onClick={() => navigate(RELEASE_REPORT_ROUTE)}
                >
                    Отчёт по реализаций
                </Button>
                <Button
                    height={'100%'}
                    width={'25%'}
                    bg={'rgba(217, 217, 217, 1)'}
                    onClick={() => navigate(VISIT_REPORT_ROUTE)}
                >
                    Отчёт по посещений
                </Button>
                <Button
                    height={'100%'}
                    width={'15%'}
                    onClick={() => navigate(RECONCILIATION_REPORT_ROUTE)}
                >
                    Акт Сверки
                </Button>
            </Header>

            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'100%'}>
                        <DateRange
                            selectionRange={selectionRange}
                            setSelectionRange={setSelectionRange}
                        />
                        <Select
                            width={'fit-content'}
                            value={selectedPersonal}
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
                    <TableContainer>
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
