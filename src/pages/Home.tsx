import TopNavBar from '../components/NavBar'
import { Box, Image } from '@chakra-ui/react'
import MobileNavbar from '@/components/MobileNavbar'
import IsMobile from '@/utils/helpers/isMobile'
import MainBg from '../assets/main-bg.png'

const Home = () => {
    return (
        <>
            {IsMobile() ? <MobileNavbar /> : <TopNavBar />}
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                height='100vh'
            >
                <Image width='90%' src={MainBg} alt='main-bg' />
            </Box>
        </>
    )
}

export default Home
