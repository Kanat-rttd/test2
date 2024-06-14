import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    IconButton,
    Select,
    Table,
    Tbody,
    Td,
    Th,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import Dialog from '@/components/Dialog'
import { useApi } from '@/utils/services/axios'
import { deleteProviderGoods } from '@/utils/services/providerGoods.service'
import { useNotify } from '@/utils/providers/ToastProvider'
import { mutate } from 'swr'
import { TableContainer, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { ProviderGoodsType } from '@/utils/types/providerGoog.types'
import GoodsAddModal from '../components/GoodsAddModal'
import { ProviderType } from '@/utils/types/provider.types'

type GoodsCategory = {
    id: number
    category: string
}

const AdminGoods = () => {
    const { error, success } = useNotify()
    const [selectedStatus, setSelectedStatus] = useState('')
    const { data: goodsCategories } = useApi<GoodsCategory[]>('goodsCategories')
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const { data: providerGoodsData, isLoading } = useApi<ProviderGoodsType[]>('providerGoods', {
        status: selectedStatus,
    })
    const { data: providerData } = useApi<ProviderType[]>('providers')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<ProviderGoodsType>()

    const handleSelectChange = (status: string) => {
        setSelectedStatus(status)
    }

    const handlerDeleteProvider = (selectedData: ProviderGoodsType | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteProviderGoods(selectedData.id)
            responsePromise
                .then((res) => {
                    mutate(`providerGoods?status=${selectedStatus}`)
                    success(res.data.message)
                })
                .catch((err) => {
                    error(err.response.data.error)
                })
        } else {
            console.error('No user data available to delete.')
        }
        setSelectedData(undefined)
    }

    const handledSuccess = () => {
        mutate(`providerGoods?status=${selectedStatus}`)
        setSelectedData(undefined)
    }

    const handleClose = () => {
        setSelectedData(undefined)
        onClose()
    }

    return (
        <>
            <UniversalComponent>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <Select
                                name="status"
                                placeholder="Статус"
                                width={'fit-content'}
                                onChange={(e) => handleSelectChange(e.target.value)}
                            >
                                <option value="Активный">Активный</option>
                                <option value="Неактивный">Неактивный</option>
                            </Select>
                        </Box>

                        <Button colorScheme="purple" onClick={onOpen}>
                            Добавить
                        </Button>
                    </Box>

                    <TableContainer
                        isLoading={isLoading}
                        style={{ width: '100%', height: '100%', overflowY: 'auto' }}
                    >
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Товар</Th>
                                    <Th>Категория товара</Th>
                                    <Th>Поставщик</Th>
                                    <Th>Единица измерения</Th>
                                    <Th>Место</Th>
                                    <Th>Статус</Th>
                                    <Th>Действия</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {providerGoodsData?.map((item, index) => {
                                    const placesLabels = JSON.parse(String(item.place)).map(
                                        (place: { label: string }) => place.label,
                                    )
                                    const providerName = providerData?.find(
                                        (provider) => provider.id == item.providerId,
                                    )
                                    const placesString = placesLabels.join(', ')

                                    return (
                                        <Tr key={index}>
                                            <Td>{index + Number(1)}</Td>
                                            <Td>{item.goods}</Td>
                                            <Td>
                                                {
                                                    goodsCategories?.find(
                                                        (category) =>
                                                            category.id == item.goodsCategoryId,
                                                    )?.category
                                                }
                                            </Td>
                                            <Td>{providerName?.providerName}</Td>
                                            <Td>{item.unitOfMeasure}</Td>
                                            <Td>{placesString}</Td>
                                            <Td>{item.status}</Td>
                                            <Td sx={{ width: '5%' }}>
                                                <IconButton
                                                    variant="outline"
                                                    size={'sm'}
                                                    colorScheme="teal"
                                                    aria-label="Send email"
                                                    marginRight={3}
                                                    onClick={() => {
                                                        setSelectedData(item)
                                                        onOpen()
                                                    }}
                                                    icon={<EditIcon />}
                                                />
                                                <IconButton
                                                    variant="outline"
                                                    size={'sm'}
                                                    colorScheme="teal"
                                                    aria-label="Send email"
                                                    marginRight={3}
                                                    onClick={() => {
                                                        setSelectedData(item)
                                                        setDialog({
                                                            ...dialog,
                                                            isOpen: true,
                                                        })
                                                    }}
                                                    icon={<DeleteIcon />}
                                                />
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
                <Dialog
                    isOpen={dialog.isOpen}
                    onClose={() => {
                        dialog.onClose()
                        setSelectedData(undefined)
                    }}
                    header="Удалить"
                    body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                    actionBtn={() => {
                        dialog.onClose()
                        handlerDeleteProvider(selectedData)
                    }}
                    actionText="Удалить"
                />
                <GoodsAddModal
                    isOpen={isOpen}
                    onClose={handleClose}
                    selectedData={selectedData}
                    onSuccess={handledSuccess}
                />
            </UniversalComponent>
        </>
    )
}

export default AdminGoods
