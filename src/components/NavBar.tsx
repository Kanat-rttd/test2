import { Text, Flex, Image } from '@chakra-ui/react'
import Drawler from './Drawler'

const TopNavBar = () => {
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
        >
            <Drawler></Drawler>

            <Image
                borderRadius="full"
                boxSize="50px"
                src="https://w7.pngwing.com/pngs/802/361/png-transparent-bakery-bread-logo-pretzel-cafe-logo-idea-food-label-cake.png"
                alt="bakery"
            />
            <Text fontSize="xl" fontWeight="bold" padding={'10px'}>
                Bread Factory
            </Text>
        </Flex>
    )
}

export default TopNavBar
