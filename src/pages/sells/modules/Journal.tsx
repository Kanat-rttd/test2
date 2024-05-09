import { Box, Button, Avatar, Select } from '@chakra-ui/react'
import Drawler from '@/components/Menu'
import { useState, useEffect } from 'react'
import {
    SELLS_INVOICE_ROUTE,
    SELLS_DEBT_ACCOUNTING_ROUTE,
    SELLS_DEBT_TRANSFER_ROUTE,
} from '@/utils/constants/routes.consts'
import ListTable from '../components/ListTable'
// import DateRangePicker from '@/components/DateRangePicker'

import { useNavigate } from 'react-router-dom'
import DateRange from '@/components/DateRange'

const JournalPage = () => {
    const navigate = useNavigate()

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    useEffect(() => {
        console.log(selectionRange.startDate)
        console.log(selectionRange.endDate)
    }, [selectionRange])

    return (
        <>
            <Box>
                <Box
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                >
                    <Box width={'100%'}>
                        <Drawler></Drawler>
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
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            {/* <DateRangePicker></DateRangePicker> */}
                            <DateRange
                                selectionRange={selectionRange}
                                setSelectionRange={setSelectionRange}
                            />
                            <Select placeholder="Цехи" width={'fit-content'}>
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                            <Select placeholder="Реализатор" width={'fit-content'}>
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                            <Select placeholder="Продукт" width={'fit-content'}>
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                        </Box>
                    </Box>
                    <Box>
                        <ListTable status="0" />
                    </Box>
                </Box>
                {/* <DistributionModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} status="0" /> */}
            </Box>
        </>
    )
}

export default JournalPage
