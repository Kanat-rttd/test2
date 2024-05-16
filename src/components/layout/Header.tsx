import { Avatar, Box, BoxProps, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import classes from './style.module.css'
import MenuAccordion from '../MenuAccordion'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '@/utils/constants/routes.consts'

interface StyledContainerProps extends BoxProps {
    children?: React.ReactNode
}

const Header: React.FC<StyledContainerProps> = ({ children }) => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        window.localStorage.removeItem('authToken')
        navigate(LOGIN_ROUTE, { replace: true })
    }
    return (
        <Box className={classes.header}>
            <Box width={'100%'} display={'flex'}>
                <MenuAccordion />
                <Box w={'100%'} h={'100%'}>
                    {children}
                </Box>
            </Box>
            <Box className={classes.logo}>
                <Menu>
                    <MenuButton borderRadius="25px">
                        <Avatar width={'35px'} height={'35px'} bg="teal.500" mr={2} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={handleLogOut}>
                            <Text>Выйти</Text>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Box>
    )
}

export default Header
