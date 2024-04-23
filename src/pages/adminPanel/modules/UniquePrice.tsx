import Drawler from '@/components/Drawler'
import { ADMIN_RELEASE_ROUTE, ADMIN_UNIQUEPRICE_ROUTE } from '@/utils/constants/routes.consts'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import {
    Avatar,
    Box,
    Button,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Td,
    Tfoot,
    useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import UniquePriceAddModal, { UniquePrice } from '../components/UniquePriceAddModal'
import { useState, useEffect } from 'react'
import Dialog from '@/components/Dialog'
import {
    getAllIndividualPrices,
    deleteIndividualPrice,
} from '@/utils/services/individualPrices.service'

import { getAllClients } from '@/utils/services/client.service'

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

interface individualPrice {
    clientId: string
    clientName: string
    detail: [
        {
            individualPriceId: string
            id: string
            name: string
            price: string
            date: Date
        },
    ]
}

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<UniquePrice | undefined>(undefined)
    const [selectedRelease, setSelectedRelease] = useState<string>('')
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const [_clients, setClientsData] = useState<Client[]>([])
    const [inPriceData, setInPriceData] = useState<individualPrice[]>([])

    const handleClose = () => {
        onClose()
        setSelectedData(undefined)
    }

    useEffect(() => {
        getAllClients({ name: '', telegrammId: '', status: '' }).then((responseData) => {
            setClientsData(responseData)
            console.log(responseData)
        })
    }, [])

    useEffect(() => {
        getAllIndividualPrices().then((responseData) => {
            setInPriceData(responseData)
            console.log(responseData)
        })
    }, [])

    return (
        <>
            <Box>
                <Box
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                >
                    <Box width={'100%'}>
                        <Drawler></Drawler>
                        <Button height={'100%'} onClick={() => navigate(ADMIN_RELEASE_ROUTE)}>
                            Реализаторы
                        </Button>
                        <Button
                            height={'100%'}
                            onClick={() => navigate(ADMIN_UNIQUEPRICE_ROUTE)}
                            bg={'rgba(217, 217, 217, 1)'}
                        >
                            Уникальные цены
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>

                <Box width={'100%'} height={'100%'} p={5}>
                    <Box>
                        <Box
                            display={'flex'}
                            width={'100%'}
                            justifyContent={'space-between'}
                            paddingLeft={4}
                            paddingRight={10}
                            marginBottom={5}
                        >
                            <Text>Реализатор</Text>
                            <Text>Время изменения</Text>
                        </Box>
                        <Accordion>
                            {inPriceData?.map((item, index) => {
                                console.log(item)
                                return (
                                    <AccordionItem key={index}>
                                        <h2>
                                            <AccordionButton background={'#F5F5F5'}>
                                                <Box
                                                    as="span"
                                                    flex="1"
                                                    textAlign="left"
                                                    fontWeight={600}
                                                >
                                                    {item.clientName}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <TableContainer>
                                                <Table variant="simple">
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Продукты</Th>
                                                            <Th>Цена</Th>
                                                            <Th isNumeric></Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {item.detail &&
                                                            item.detail.map((value) => {
                                                                console.log(value)
                                                                return (
                                                                    <Tr key={value.id}>
                                                                        <Td>{value.name}</Td>
                                                                        <Td>{value.price}</Td>
                                                                        <Td
                                                                            isNumeric
                                                                            display={'flex'}
                                                                            gap={'10px'}
                                                                            justifyContent={
                                                                                'flex-end'
                                                                            }
                                                                        >
                                                                            {dayjs(
                                                                                value.date,
                                                                            ).format('DD.MM.YYYY')}
                                                                            <Box>
                                                                                <EditIcon
                                                                                    boxSize={
                                                                                        '1.5em'
                                                                                    }
                                                                                    cursor={
                                                                                        'pointer'
                                                                                    }
                                                                                    onClick={() => {
                                                                                        setSelectedData(
                                                                                            {
                                                                                                clientId:
                                                                                                    item.clientId,
                                                                                                clientName:
                                                                                                    item.clientName,
                                                                                                detail: [
                                                                                                    {
                                                                                                        individualPriceId:
                                                                                                            value.individualPriceId,
                                                                                                        id: value.id,
                                                                                                        name: value.name,
                                                                                                        price: value.price,
                                                                                                        date: value.date,
                                                                                                    },
                                                                                                ],
                                                                                            },
                                                                                        )
                                                                                        onOpen()
                                                                                    }}
                                                                                />
                                                                                <DeleteIcon
                                                                                    boxSize={
                                                                                        '1.5em'
                                                                                    }
                                                                                    color={'red'}
                                                                                    cursor={
                                                                                        'pointer'
                                                                                    }
                                                                                    onClick={() => {
                                                                                        setSelectedData(
                                                                                            {
                                                                                                clientId:
                                                                                                    item.clientId,
                                                                                                clientName:
                                                                                                    item.clientName,
                                                                                                detail: [
                                                                                                    {
                                                                                                        individualPriceId:
                                                                                                            value.individualPriceId,
                                                                                                        id: value.id,
                                                                                                        name: value.name,
                                                                                                        price: value.price,
                                                                                                        date: value.date,
                                                                                                    },
                                                                                                ],
                                                                                            },
                                                                                        )
                                                                                        setDialog({
                                                                                            ...dialog,
                                                                                            isOpen: true,
                                                                                        })
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        </Td>
                                                                    </Tr>
                                                                )
                                                            })}
                                                    </Tbody>
                                                    <Tfoot>
                                                        <Tr>
                                                            <Th></Th>
                                                            <Th></Th>
                                                            <Th isNumeric>
                                                                <Button
                                                                    colorScheme="purple"
                                                                    onClick={() => {
                                                                        setSelectedRelease(
                                                                            item.clientName,
                                                                        )
                                                                        onOpen()
                                                                    }}
                                                                >
                                                                    Добавить
                                                                </Button>
                                                            </Th>
                                                        </Tr>
                                                    </Tfoot>
                                                </Table>
                                            </TableContainer>
                                        </AccordionPanel>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </Box>
                </Box>
            </Box>
            <UniquePriceAddModal
                data={selectedData}
                selectedRelease={selectedRelease}
                isOpen={isOpen}
                onClose={handleClose}
            />
            <Dialog
                isOpen={dialog.isOpen}
                onClose={dialog.onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={() => {
                    deleteIndividualPrice(selectedData?.detail[0].individualPriceId ?? '').then(
                        (res) => {
                            console.log(res)
                        },
                    )
                    onClose()
                }}
                actionText="Удалить"
            />
        </>
    )
}

export default AdminPanel
