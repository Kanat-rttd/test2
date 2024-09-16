import { Box, Heading, Text, Input, Image } from '@chakra-ui/react'
import { SALES_HISTORY_ROUTE, SALES_REQUEST_FORM_ROUTE } from '@/utils/constants/routes.consts'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
    const navigator = useNavigate()

    const redirectToSalesForm = () => {
        navigator(SALES_REQUEST_FORM_ROUTE)
    }

    const redirectToHistory = () => {
        navigator(SALES_HISTORY_ROUTE)
    }

    return (
        <Box
            textAlign='center'
            p={5}
            position='relative'
            minHeight='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <Image
                src='/src/assets/Success.png'
                alt='SuccessImg'
                mb={5}
                style={{ marginTop: '-20px', marginBottom: '25px' }}
            />

            <Heading as='h2' size='lg' mb={50}>
                Заказ успешно создан
            </Heading>

            <Text mb={3}>Ваши товары скоро будут ждать вас</Text>

            <Box position='absolute' bottom={0} left={0} right={0} p={5}>
                <Input
                    variant='filled'
                    size='lg'
                    color='white'
                    backgroundColor='#F7B23B'
                    placeholder='Filled'
                    width='100%'
                    borderRadius={15}
                    textAlign='center'
                    defaultValue='Еще заказ'
                    mb={2}
                    onClick={redirectToSalesForm}
                />
                <Input
                    variant='filled'
                    size='lg'
                    color='black'
                    backgroundColor='white'
                    placeholder='Filled'
                    width='100%'
                    borderRadius={15}
                    textAlign='center'
                    defaultValue='История заказов'
                    onClick={redirectToHistory}
                />
            </Box>
        </Box>
    )
}

export default SuccessPage
