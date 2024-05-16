import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from './Header'

type LayoutProps = {
    children: ReactNode
}

/**
 * Main layout where we have header, menu and Avatar
 * @param param0
 * @returns
 */
const Layout = ({ children }: LayoutProps) => {
    return (
        <Box display="flex" flexDirection="column" overflow="hidden" minH="100dvh">
            <Header />
            <Box minH="90dvh">
                {children}
            </Box>
        </Box>
    )
}

export default Layout
