import Drawler from '@/components/Drawler'
import { ADMIN_RELEASE_ROUTE, ADMIN_UNIQUEPRICE_ROUTE } from '@/utils/constants/routes.consts'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
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
import { useState } from 'react'
import Dialog from '@/components/Dialog'

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<UniquePrice | undefined>(undefined)
    const [selectedRelease, setSelectedRelease] = useState<string>('')
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const data = [
        {
            release: 'Алишер',
            date: '14:20 21.02.2024',
            detail: [
                {
                    id: 1,
                    bread: 'Итальянский',
                    price: '50',
                    date: '14:20 21.02.2024',
                },
            ],
        },
        {
            release: 'Алишер 1',
            date: '14:20 21.02.2024',
            detail: [
                {
                    id: 2,
                    bread: 'Городской',
                    price: '100',
                    date: '14:25 22.02.2024',
                },
            ],
        },
    ]

    console.log(selectedData)

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
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(ADMIN_RELEASE_ROUTE)}
                        >
                            Реализаторы
                        </Button>
                        <Button
                            bg={'rgba(217, 217, 217, 1)'}
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(ADMIN_UNIQUEPRICE_ROUTE)}
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
                            {data.map((item, index) => {
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
                                                    {item.release}
                                                </Box>
                                                <Box
                                                    as="span"
                                                    flex="1"
                                                    textAlign="right"
                                                    fontWeight={600}
                                                    // marginRight={'2%'}
                                                >
                                                    {item.date}
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
                                                                return (
                                                                    <Tr key={value.id}>
                                                                        <Td>{value.bread}</Td>
                                                                        <Td>{value.price}</Td>
                                                                        <Td
                                                                            isNumeric
                                                                            display={'flex'}
                                                                            gap={'10px'}
                                                                            justifyContent={
                                                                                'flex-end'
                                                                            }
                                                                        >
                                                                            {value.date}
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
                                                                                            item,
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
                                                                                    onClick={() =>
                                                                                        setDialog({
                                                                                            ...dialog,
                                                                                            isOpen: true,
                                                                                        })
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
                                                                            item.release,
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
                onClose={onClose}
            />
            <Dialog
                isOpen={dialog.isOpen}
                onOpen={onOpen}
                onClose={dialog.onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={onClose}
                actionText="Удалить"
            />
        </>
    )
}

export default AdminPanel
