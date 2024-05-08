import { Avatar, Box, BoxProps } from '@chakra-ui/react'
import classes from './styles.module.css'
import Drawler from './Drawler'
import { Fragment } from 'react'

interface StyledContainerProps extends BoxProps {
    children?: React.ReactNode
}

const Header: React.FC<StyledContainerProps> = ({ children }) => {
    return (
        <Box className={classes.header}>
            <Box>
                <Drawler />
                <Fragment>{children}</Fragment>
            </Box>
            <Box className={classes.logo}>
                <Avatar size={'md'} bg="teal.500" mr={2} />
            </Box>
        </Box>
    )
}

export default Header
