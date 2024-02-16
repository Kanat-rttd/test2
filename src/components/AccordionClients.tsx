import {
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    Heading,
    AccordionIcon,
    AccordionPanel,
    Table,
    Tbody,
    Tr,
    Td,
    Tfoot,
    Button,
} from '@chakra-ui/react'

import { OrderArray } from '../utils/types/types'

type accorfionClientType = {
    data: OrderArray
    handleChangeStatus: (clientName: string) => void
}

const AccordionClients = ({ data, handleChangeStatus }: accorfionClientType) => {
    const defaultIndex = Array.from({ length: data.length }, (_, index) => index)

    const handleConfirmClick = (clientName: string) => {
        handleChangeStatus(clientName)
    }
    loh
    return (
        <Accordion defaultIndex={defaultIndex} allowMultiple>
            {data.map((order, index) => (
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton backgroundColor={'#e6e6e6'}>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                as="span"
                                flex="1"
                                textAlign="left"
                            >
                                <Heading size={'sm'}>{order.name}</Heading>
                                <Heading size={'sm'}>Total - {order.total}</Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={0}>
                        <Table variant="unstyled">
                            <Tbody>
                                {order.products.map((item, index) => (
                                    <Tr key={index}>
                                        <Td width={'80%'}>{item.productName}</Td>
                                        <Td>{item.quantity}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Td></Td>
                                    <Td>
                                        <Button
                                            width={'100%'}
                                            onClick={() => handleConfirmClick(order.name)}
                                        >
                                            Подтвердить
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default AccordionClients
