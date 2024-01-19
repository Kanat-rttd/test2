import {
    Box,
    Stack,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Button,
    Input,
    Heading,
} from '@chakra-ui/react'

import { authUser } from '../utils/services/user.service'

// import { MAIN_ROUTE } from '../utils/constants/routes.consts'
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    // const navigate = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputPhoneNumber = e.target.value
        const cleanedInput = inputPhoneNumber.replace(/\D/g, '')

        if (cleanedInput.length <= 10) {
            setPhoneNumber(cleanedInput)
        } else {
            console.log('limit')
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleConfirmClick = () => {
        console.log(phoneNumber)
        console.log(password)
        let data = { phone: phoneNumber, pass: password }

        authUser(data).then((res) => {
            console.log(res)
        })
    }

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="80vh"
            >
                <Stack spacing={4}>
                    <Heading textAlign={'center'}>Login Page</Heading>
                    <InputGroup size={'lg'}>
                        <InputLeftAddon>+7</InputLeftAddon>
                        <Input
                            type="tel"
                            placeholder="(777)-777-77-77"
                            value={phoneNumber}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                    <InputGroup size="lg">
                        <Input
                            pr="4.5rem"
                            type={show ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button size={'lg'} onClick={handleConfirmClick}>
                        Confirm
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default Login
