import {
    useDisclosure,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Icon,
    Heading,
    Link,
    Divider,
    Box,
} from '@chakra-ui/react'
import { menuItems, subMenuItems } from '../utils/constants/menu.consts'
import { LOGIN_ROUTE } from '../utils/constants/routes.consts'
import { useEffect, useRef, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '@/utils/helpers/getUserInfo'

/**
 * Default Loader which you can use between page or big fetch
 * @returns {JSX}
 */
//TODO:comment не совпадает с действительностью плюс название компонента по лучше можно
const Drawler = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<HTMLButtonElement | null>(null)

    const userInfo = getUserInfo()

    const filteredMenuItems = menuItems.filter((item) => {
        return (
            userInfo?.class && item.allowedClasses && item.allowedClasses.includes(userInfo.class)
        )
    })

    useEffect(() => {
        if (isOpen && btnRef.current) {
            btnRef.current.focus()
        }
    }, [isOpen])

    return (
        <>
            <Button ref={btnRef} colorScheme="white" onClick={onOpen}>
                <Icon viewBox="0 0 24 24" fill="none" boxSize={6} color="black">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" strokeWidth="2"></path>
                </Icon>
            </Button>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Меню</DrawerHeader>

                    <DrawerBody display="flex" p={2} gap="0.5rem" flexDirection="column">
                        {filteredMenuItems.map((MenuItem) => (
                            <Fragment key={MenuItem.route}>
                                <Divider />
                                <Heading paddingLeft={'0.5rem'} p={2} size="sm">
                                    <Link onClick={() => navigate(MenuItem.route)}>
                                        {MenuItem.label}
                                    </Link>
                                </Heading>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    width={'100%'}
                                    gap={'1.2rem'}
                                    textAlign={'start'}
                                    paddingLeft={'2rem'}
                                >
                                    {subMenuItems.map(
                                        ({ route, label, path }) =>
                                            path === MenuItem.route && (
                                                <Link
                                                    key={route}
                                                    variant="ghost"
                                                    width={'60%'}
                                                    lineHeight={'20px'}
                                                    fontWeight={600}
                                                    onClick={() => navigate(route)}
                                                >
                                                    {label}
                                                </Link>
                                            ),
                                    )}
                                </Box>
                            </Fragment>
                        ))}
                    </DrawerBody>

                    <DrawerFooter>
                        <Link onClick={() => navigate(LOGIN_ROUTE)}>Выход</Link>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Drawler
