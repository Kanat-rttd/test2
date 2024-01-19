import TopNavBar from '../components/NavBar'
import { Box } from '@chakra-ui/react'

const Home = () => {
    console.log('home')
    return (
        <>
            <TopNavBar></TopNavBar>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="80vh"
            >
                Main Page
            </Box>
        </>
    )
}

export default Home
