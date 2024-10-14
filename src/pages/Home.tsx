import TopNavBar from '../components/NavBar'
import MobileNavbar from '@/components/MobileNavbar'
import IsMobile from '@/utils/helpers/isMobile'
import mainBg from '@/assets/main-bg.png'
import { AspectRatio, Image } from '@chakra-ui/react'

const Home = () => {
    return (
        <>
            {IsMobile() ? <MobileNavbar /> : <TopNavBar />}
            <AspectRatio height='90dvh' ratio={1920 / 1080}>
                <Image src={mainBg} alt='bg' objectFit='cover' />
            </AspectRatio>
        </>
    )
}

export default Home
