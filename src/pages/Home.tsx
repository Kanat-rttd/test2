import TopNavBar from '../components/NavBar'
import { Box } from '@chakra-ui/react'
import MobileNavbar from '@/components/MobileNavbar'
import IsMobile from '@/utils/helpers/isMobile'

const Home = () => {
    //console.log('home')
    return (
        <>
            {IsMobile() ? <MobileNavbar /> : <TopNavBar />}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                Main Page
            </Box>
        </>
    )
}

export default Home
