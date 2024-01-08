import { Text, Flex, Spacer, Image } from '@chakra-ui/react'

const TopNavBar = () => {
    return (
        <Flex
            h="10vh"
            alignItems="center"
            p="6"
            boxShadow={scroll ? 'base' : 'none'}
            position="sticky"
            top="0"
            zIndex="sticky"
            w="full"
        >
            <Image borderRadius="full" boxSize="50px" src="../assets/bakery.png" alt="bakery" />
            <Text fontSize="xl" fontWeight="bold">
                Bread Factory
            </Text>

            <Spacer />

            <Flex alignItems="center">
                <Text fontSize="md" mr="10">
                    About
                </Text>
                <Text fontSize="md">More Apps</Text>
            </Flex>
        </Flex>
    )
}

export default TopNavBar
