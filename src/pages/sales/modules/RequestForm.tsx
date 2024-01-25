import MobileNavbar from '@/components/MobileNavbar'
import { Box, Heading, Input, IconButton, Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import dayjs from 'dayjs'

const RequestForm = () => {
    const [data, setData] = useState(new Date())
    return (
        <>
            <MobileNavbar></MobileNavbar>
            <Box
                display="flex"
                flexDirection="column"
                height="100vh"
                backgroundColor={'#ffff88'}
                gap={5}
            >
                <Box
                    borderBottom={'2px solid #E2E2E2'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    textAlign={'center'}
                    alignItems={'center'}
                    p={5}
                    gap={4}
                >
                    <Heading>Заказ</Heading>
                    <Input
                        variant="filled"
                        placeholder="Filled"
                        width={'50%'}
                        borderRadius={'15'}
                        defaultValue={dayjs(data).format('DD.MM.YYYY')}
                        textAlign={'center'}
                    />
                </Box>

                <Box textAlign={'center'} p={5}>
                    <IconButton
                        backgroundColor={'#F7B23B'}
                        borderRadius={15}
                        color={'white'}
                        size={'md'}
                        aria-label="Send email"
                        marginRight={3}
                        icon={<AddIcon />}
                    />
                </Box>

                <Box m={5} borderBottom={'1px solid #7C7C7C'}>
                    <Text mb="8px" color={'#7C7C7C'} textAlign={'left'}>
                        Комментарий
                    </Text>
                    <Input border={'none'} />
                </Box>

                <Box textAlign={'center'} p={5}>
                    <Input
                        variant="filled"
                        size={'lg'}
                        color={'white'}
                        backgroundColor={'#F7B23B'}
                        placeholder="Filled"
                        width={'100%'}
                        borderRadius={'15'}
                        textAlign={'center'}
                        defaultValue={'Заказать'}
                    />
                </Box>
            </Box>
        </>
    )
}

export default RequestForm
