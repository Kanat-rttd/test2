import { Flex } from '@chakra-ui/react'

const NavMenuBlock = () => {
    return (
        <Flex
            h="10vh"
            alignItems="center"
            p="5"
            //TODO: Это кто такой на 1?
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
