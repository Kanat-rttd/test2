import { Avatar, Box, BoxProps } from '@chakra-ui/react'
import classes from './styles.module.css'
import MenuAccordion from './MenuAccordion'

interface StyledContainerProps extends BoxProps {
    children?: React.ReactNode
}

const Header: React.FC<StyledContainerProps> = ({ children }) => {
    return (
        <Box className={classes.header}>
            <Box width={'100%'} display={'flex'}>
                <MenuAccordion />
                <Box w={'100%'} h={'100%'}>{children}</Box>
            </Box>
            <Box className={classes.logo}>
                <Avatar width={'35px'} height={'35px'} bg="teal.500" mr={2} />
            </Box>
        </Box>
    )
}

export default Header
