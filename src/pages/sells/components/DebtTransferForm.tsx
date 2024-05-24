import {
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { createDebtTransfer } from '@/utils/services/debtTransfer.service'
import { useApi } from '@/utils/services/axios'

interface Client {
    id: number
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: number
}

interface DebtTransferInputs {
    fromProvider: number
    summa: string
    toMagazine: number
    date: Date
    invoiceNumber: number
    comment: string
}

interface Magazines {
    id: number
    name: string
    clientId: number
    status: string
    client: {
        id: number
        name: string
    }
}

interface InvoiceData {
    createdAt: Date
    clientId: number
    clientName: string
    invoiceNumber: number
    totalProducts: {
        id: number
        name: string
        price: number
        quantity: number
        totalPrice: number
    }[]
    totalSum: number
    dispatches: {
        id: number
        clientId: number
        createdAt: Date
        dispatch: number
        goodsDispatchDetails: {
            id: number
            productId: number
            quantity: number
            price: number | null
            product: {
                id: number
                name: string
                price: number
                bakingFacilityUnit: {
                    id: number
                    facilityUnit: string
                }
            }
        }[]
        client: {
            id: number
            name: string
        }
    }[]
}

const DebtTransferForm = () => {
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

    // const { data: debtTransfer } = useApi('debtTransfer')
    const { data: magazinesData } = useApi<Magazines[]>('magazines')
    const { data: clientsData } = useApi<Client[]>('client')
    const { data: dispatchesData } = useApi<InvoiceData[]>('release/invoice')

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        // reset,
    } = useForm<DebtTransferInputs>()

    const sendData = (formData: DebtTransferInputs) => {
        createDebtTransfer(formData)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
    }

    return (
        <>
            <Box height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Box
                    width={'50%'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'15px'}
                    flex={1}
                    border={'1px solid gray'}
                    p={5}
                    borderRadius={5}
                >
                    <Heading size={'md'} textAlign={'center'}>
                        Перевод долга
                    </Heading>
                    <Divider></Divider>
                    {/* <FormControl isInvalid={!!errors.fromProvider}>
                        <Input
                            maxLength={20}
                            {...register('fromProvider', {
                                required: 'Поле является обязательным',
                            })}
                            autoComplete="off"
                            placeholder="От Реализаторов *"
                            type="string"
                        />
                        <FormErrorMessage>{errors.fromProvider?.message}</FormErrorMessage>
                    </FormControl> */}

                    <FormControl isInvalid={!!errors.fromProvider}>
                        <Controller
                            name="fromProvider"
                            control={control}
                            rules={{ required: 'Поле является обязательным' }}
                            render={({ field }) => {
                                const { onChange, value } = field
                                return (
                                    <Select
                                        options={clientsData}
                                        getOptionLabel={(option: Client) => option.name}
                                        getOptionValue={(option: Client) => `${option.id}`}
                                        value={clientsData?.filter(
                                            (option) => String(option.id) == String(value),
                                        )}
                                        // onChange={(val: Account) => onChange(val?.name)}
                                        onChange={(selectedOption: Client | null) => {
                                            if (selectedOption) {
                                                onChange(selectedOption.id)
                                                setSelectedProvider(selectedOption.name)
                                            }
                                        }}
                                        placeholder="Реализатор *"
                                        isClearable
                                        isSearchable
                                    />
                                )
                            }}
                        />
                        <FormErrorMessage>{errors.fromProvider?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.summa}>
                        <Input
                            maxLength={20}
                            {...register('summa', { required: 'Поле является обязательным' })}
                            autoComplete="off"
                            placeholder="Сумма *"
                            type="number"
                        />
                        <FormErrorMessage>{errors.summa?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.toMagazine}>
                        <Controller
                            name="toMagazine"
                            control={control}
                            rules={{ required: 'Поле является обязательным' }}
                            render={({ field }) => {
                                const { onChange, value } = field
                                const filteredMagazines = magazinesData?.filter(
                                    (option) => option.client.name == selectedProvider,
                                )
                                return (
                                    <Select
                                        options={filteredMagazines}
                                        getOptionLabel={(option: Magazines) => option.name}
                                        getOptionValue={(option: Magazines) => `${option.id}`}
                                        value={filteredMagazines?.find(
                                            (option) => option.id === value,
                                        )}
                                        onChange={(selectedOption: Magazines | null) => {
                                            if (selectedOption) {
                                                onChange(selectedOption.id)
                                            }
                                        }}
                                        placeholder="К магазинам *"
                                        isClearable
                                        isSearchable
                                    />
                                )
                            }}
                        />
                        <FormErrorMessage>{errors.toMagazine?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl variant={'floating'} isInvalid={!!errors.date}>
                        <Input
                            {...register('date', { required: 'Поле является обязательным' })}
                            autoComplete="off"
                            placeholder="Дата"
                            type="date"
                        />
                    </FormControl>

                    <FormControl isInvalid={!!errors.invoiceNumber}>
                        <Controller
                            name="invoiceNumber"
                            control={control}
                            rules={{ required: 'Поля является обязательным' }}
                            render={({ field }) => {
                                const { onChange, value } = field
                                return (
                                    <Select
                                        options={dispatchesData}
                                        getOptionLabel={(option: InvoiceData) =>
                                            String(option.invoiceNumber)
                                        }
                                        getOptionValue={(option: InvoiceData) =>
                                            `${option.invoiceNumber}`
                                        }
                                        value={dispatchesData?.filter(
                                            (option) =>
                                                String(option.invoiceNumber) == String(value),
                                        )}
                                        // onChange={(val: Account) => onChange(val?.name)}
                                        onChange={(selectedOption: InvoiceData | null) => {
                                            if (selectedOption) {
                                                onChange(selectedOption.invoiceNumber)
                                            }
                                        }}
                                        placeholder="Номер накладной *"
                                        isClearable
                                        isSearchable
                                    />
                                )
                            }}
                        />
                        <FormErrorMessage>{errors.invoiceNumber?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <Textarea
                            placeholder="Комментарий"
                            maxLength={50}
                            size="sm"
                            {...register('comment')}
                            resize="none"
                        />
                    </FormControl>
                    <Box style={{ width: '100%', textAlign: 'center' }}>
                        <Button colorScheme="blue" mr={3}>
                            Закрыть
                        </Button>
                        <Button
                            style={{ background: '#29647C', color: '#fff' }}
                            onClick={handleSubmitForm(sendData)}
                        >
                            Отправить
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DebtTransferForm
