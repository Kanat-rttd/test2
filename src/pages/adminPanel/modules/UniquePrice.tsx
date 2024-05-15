import { ADMIN_RELEASE_ROUTE, ADMIN_UNIQUEPRICE_ROUTE } from '@/utils/constants/routes.consts'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import {
    Box,
    Button,
    Table,
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
    IconButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import UniquePriceAddModal, { UniquePrice } from '../components/UniquePriceAddModal'
import { useState, useEffect, useMemo } from 'react'
import Dialog from '@/components/Dialog'
import {
    getAllIndividualPrices,
    deleteIndividualPrice,
} from '@/utils/services/individualPrices.service'

import { getAllClients } from '@/utils/services/client.service'
import { useApi } from '@/utils/services/axios'
import { TableContainer } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import Header from '@/components/Header'

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
    const { data: individualPrices } = useApi<individualPrice[]>('inPrice')
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
        })
    }, [])

    const getIndividualPrices = () => {
        getAllIndividualPrices().then((responseData) => {
            setInPriceData(responseData)
        })
    }

    useEffect(() => {
        getIndividualPrices()
    }, [])

    const recentUpdatesDates = useMemo(() => {
        if (!Array.isArray(individualPrices) || individualPrices.length === 0) {
            return []
        }

        return individualPrices.map((client) => {
            const { clientName, detail } = client

            if (!Array.isArray(detail) || !detail.length) {
                return { name: clientName, recentUpdates: null }
            }

            const lastUpdate = detail.reduce((prev, current) => {
                const prevDate = new Date(prev.date)
                const currentDate = new Date(current.date)
                return prevDate > currentDate ? prev : current
            })

            return { name: clientName, recentUpdates: lastUpdate.date }
        })
    }, [individualPrices])

    return (
        <>
            <UniversalComponent>
                <Header>
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
                </Header>

                <Box display="flex" flexDirection="column" p={5}>
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
                        <Accordion
                            style={{
                                height: '100%',
                                width: '100%',
                                overflowX: 'auto',
                                overflowY: 'auto',
                                maxHeight: '75dvh',
                                minHeight: '75dvh',
                            }}
                        >
                            {inPriceData?.map((item, index) => {
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
                                                {recentUpdatesDates?.map((dateData) => {
                                                    if (dateData.name == item.clientName) {
                                                        return (
                                                            <Text mr={'10px'} fontWeight={'600'}>
                                                                {dateData.recentUpdates
                                                                    ? dayjs(
                                                                          dateData.recentUpdates,
                                                                      ).format('DD.MM.YYYY HH:mm')
                                                                    : ''}
                                                            </Text>
                                                        )
                                                    }
                                                })}

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
                                                                            ).format(
                                                                                'DD.MM.YYYY HH:mm',
                                                                            )}
                                                                            <Box>
                                                                                <IconButton
                                                                                    variant="outline"
                                                                                    size={'sm'}
                                                                                    colorScheme="teal"
                                                                                    aria-label="Send email"
                                                                                    marginRight={3}
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
                                                                                    icon={
                                                                                        <EditIcon />
                                                                                    }
                                                                                />
                                                                                <IconButton
                                                                                    variant="outline"
                                                                                    size={'sm'}
                                                                                    colorScheme="teal"
                                                                                    aria-label="Send email"
                                                                                    marginRight={3}
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
                                                                                    icon={
                                                                                        <DeleteIcon />
                                                                                    }
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

                <UniquePriceAddModal
                    data={selectedData}
                    selectedRelease={selectedRelease}
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSuccess={getIndividualPrices}
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
                                getIndividualPrices()
                            },
                        )
                        dialog.onClose()
                    }}
                    actionText="Удалить"
                />
            </UniversalComponent>
        </>
    )
}

export default AdminPanel
