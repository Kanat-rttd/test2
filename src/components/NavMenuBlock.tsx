import { Flex } from '@chakra-ui/react'

const NavMenuBlock = () => {
    return (
        <Flex
            h="10vh"
            alignItems="center"
            p="5"
            boxShadow={1 ? 'base' : 'none'}
            position="sticky"
            top="0"
            zIndex="sticky"
            w="full"
            backgroundColor={'white'}
        ></Flex>
    )
}

export default NavMenuBlock
