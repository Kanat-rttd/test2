import { Fragment, useRef, useState } from 'react'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    Link,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { menuItems, subMenuItems } from '../utils/constants/menu.consts'
import getUserInfo from '@/utils/helpers/getUserInfo'
import { LOGIN_ROUTE } from '@/utils/constants/routes.consts'

/**
 * Custom navigation menu
 * We use getUserInfo function where we receive permissions for certain pages
 * and using this and menuItems from constants rendered correct forms in the menu
 * @returns {JSX}
 */

const MenuAccordion = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement | null>(null)
    const navigate = useNavigate()

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev)
    }

    const userInfo = getUserInfo()

    const parsedClass = JSON.parse(String(userInfo?.class))

    const filteredMenuItems = menuItems.filter((item) => {
        return (
            parsedClass[0].label &&
            item.allowedClasses &&
            item.allowedClasses.includes(parsedClass[0].label)
        )
    })

    const handleNavigate = (route: string) => {
        setIsDrawerOpen(false)
        navigate(route)
    }

    return (
        <>
            <Button ref={btnRef} colorScheme="white" onClick={toggleDrawer}>
                <Icon viewBox="0 0 24 24" fill="none" boxSize={6} color="black">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" strokeWidth="2"></path>
                </Icon>
            </Button>
            {isDrawerOpen && (
                <div>
                    <Drawer
                        isOpen={isDrawerOpen}
                        placement="left"
                        onClose={() => setIsDrawerOpen(false)}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay width={'100%'} />
                        <DrawerContent width={'100%'}>
                            <DrawerCloseButton />
                            <DrawerHeader>Меню</DrawerHeader>

                            <DrawerBody display="flex" p={2} gap="0.5rem" flexDirection="column">
                                <Accordion allowMultiple>
                                    {menuItems.map((MenuItem) => (
                                        <Fragment key={MenuItem.route}>
                                            <AccordionItem key={MenuItem.label}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box
                                                            as="span"
                                                            flex="1"
                                                            textAlign="left"
                                                            fontWeight={700}
                                                        >
                                                            {MenuItem.label}
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                {subMenuItems.map(
                                                    ({ route, label, path }) =>
                                                        path === MenuItem.route && (
                                                            <AccordionPanel
                                                                pb={4}
                                                                ml={'20px'}
                                                                key={path}
                                                            >
                                                                <Link
                                                                    key={route}
                                                                    variant="ghost"
                                                                    width={'60%'}
                                                                    lineHeight={'20px'}
                                                                    onClick={() =>
                                                                        handleNavigate(route)
                                                                    }
                                                                >
                                                                    {label}
                                                                </Link>
                                                            </AccordionPanel>
                                                        ),
                                                )}
                                            </AccordionItem>
                                        </Fragment>
                                    ))}
                                </Accordion>
                            </DrawerBody>
                            <DrawerFooter>
                                <Link
                                    onClick={() => {
                                        window.localStorage.removeItem('authToken')
                                        navigate(LOGIN_ROUTE)
                                    }}
                                >
                                    Выход
                                </Link>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            )}
        </>
    )
}

export default MenuAccordion
