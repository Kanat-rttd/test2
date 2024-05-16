import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import { headerButtons } from '@/utils/constants/headerButtons'

type LayoutProps = {
    children: ReactNode
}

/**
 * Main layout where we have header, menu and Avatar
 * @param param0
 * @returns
 */
const Layout = ({ children }: LayoutProps) => {
    const { pathname } = useLocation()
    console.log(pathname);

    const buttons = headerButtons.find((item) => {
        if(item.currentPage == pathname){     
            return item
        }
    })
    
    return (
        <Box display="flex" flexDirection="column" overflow="hidden" minH="100dvh">
            <Header buttons={buttons?.buttonsData} />
            <Box minH="90dvh">
                {children}
            </Box>
        </Box>
    )
}

export default Layout
