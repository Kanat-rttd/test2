import { Box, Button, Avatar } from '@chakra-ui/react'
import Drawler from '@/components/Menu'
import {
    SELLS_JOURNAL_ROUTE,
    SELLS_INVOICE_ROUTE,
    SELLS_DEBT_ACCOUNTING_ROUTE,
} from '@/utils/constants/routes.consts'
import DebtTransferForm from '../components/DebtTransferForm'

import { useNavigate } from 'react-router-dom'

const DebtTransfer = () => {
    const navigate = useNavigate()

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
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(SELLS_JOURNAL_ROUTE)}
                        >
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
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(SELLS_DEBT_ACCOUNTING_ROUTE)}
                        >
                            Учёт долгов
                        </Button>
                        <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                            Перевод долга
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
                    <DebtTransferForm />
                </Box>
            </Box>
        </>
    )
}

export default DebtTransfer
