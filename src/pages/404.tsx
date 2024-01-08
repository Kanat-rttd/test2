import { Box, Image, Heading, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import TopNavBar from '../components/NavBar'
import { MAIN_ROUTE } from '@/utils/constants/routes.consts'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <>
            <TopNavBar></TopNavBar>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            ></Box>
        </>
    )
}

export default NotFound
