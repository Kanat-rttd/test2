import { ArrivalInputs } from '@/utils/types/finance.types'
import { Box, Button, FormControl, FormErrorMessage, Input, Textarea } from '@chakra-ui/react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { createArrival } from '@/utils/services/finance.service'
import useSWR from 'swr'
import { getAllClients } from '@/utils/services/client.service'
import { getAllFinancesCategories } from '@/utils/services/financeCategories.service'
import { useApi } from '@/utils/services/axios'

const account = [
    {
        id: 1,
        name: 'Счёт 1',
    },
    {
        id: 2,
        name: 'Счёт 2',
    },
]

interface Category {
    id: number
    name: string
    type: string
}

interface Account {
    id: number
    name: string
}

interface Client {
    id: number
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: number
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

const Arrival = () => {
    const { data: dispatchesData } = useApi<InvoiceData[]>('release/invoice')
    const { data: clientsData } = useSWR<Client[]>(['client'], {
        fetcher: () => getAllClients({ name: '', telegrammId: '', status: '' }),
    })

    const { data: categoriesData } = useSWR<Category[]>(['financeCategories'], {
        fetcher: () => getAllFinancesCategories(),
    })

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        // reset,
    } = useForm<ArrivalInputs>()

    const sendData = (formData: ArrivalInputs) => {
        // console.log(formData)
        createArrival(formData)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
        // mutate()
    }

    return (
        <>
            <FormControl isInvalid={!!errors.amount}>
                <Input
                    maxLength={20}
                    {...register('amount', { required: 'Поле является обязательным' })}
                    autoComplete="off"
                    placeholder="Сумма *"
                    type="number"
                />
                <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
            </FormControl>

            <FormControl variant={'floating'} isInvalid={!!errors.date}>
                <Input
                    {...register('date', { required: 'Поле является обязательным' })}
                    autoComplete="off"
                    placeholder="Дата"
                    type="date"
                />
            </FormControl>

            <FormControl isInvalid={!!errors.account}>
                <Controller
                    name="account"
                    control={control}
                    rules={{ required: 'Поле является обязательным' }}
                    render={({ field }) => {
                        const { onChange, value } = field
                        return (
                            <Select
                                options={account}
                                getOptionLabel={(option: Account) => option.name}
                                getOptionValue={(option: Account) => `${option.name}`}
                                value={account?.filter((option) => String(option.name) == value)}
                                // onChange={(val: Account) => onChange(val?.name)}
                                onChange={(selectedOption: Account | null) => {
                                    if (selectedOption) {
                                        onChange(selectedOption.name)
                                    }
                                }}
                                placeholder="Выберите счет *"
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.account?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.financeCategoryId}>
                <Controller
                    name="financeCategoryId"
                    control={control}
                    rules={{ required: 'Поле является обязательным' }}
                    render={({ field }) => {
                        const { onChange, value } = field
                        return (
                            <Select
                                options={categoriesData}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => `${option.id}`}
                                value={categoriesData?.filter(
                                    (option) => String(option.id) == value,
                                )}
                                // onChange={(val: Category) => onChange(val?.id)}
                                onChange={(selectedOption: Category | null) => {
                                    if (selectedOption) {
                                        onChange(selectedOption.id)
                                    }
                                }}
                                placeholder="Категория *"
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.financeCategoryId?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.clientId}>
                <Controller
                    name="clientId"
                    control={control}
                    rules={{ required: 'Поле является обязательным' }}
                    render={({ field }) => {
                        const { onChange, value } = field
                        return (
                            <Select
                                options={clientsData}
                                getOptionLabel={(option: Client) => option.name}
                                getOptionValue={(option: Client) => `${option.id}`}
                                value={clientsData?.filter((option) => option.id == value)}
                                // onChange={(val: Client) => onChange(val?.id)}
                                onChange={(selectedOption: Client | null) => {
                                    if (selectedOption) {
                                        onChange(selectedOption.id)
                                    }
                                }}
                                placeholder="Контрагент *"
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.clientId?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.invoiceNumber}>
                <Controller
                    name="invoiceNumber"
                    control={control}
                    render={({ field }) => {
                        const { onChange, value } = field
                        return (
                            <Select
                                options={dispatchesData}
                                getOptionLabel={(option: InvoiceData) =>
                                    String(option.invoiceNumber)
                                }
                                getOptionValue={(option: InvoiceData) => `${option.invoiceNumber}`}
                                value={dispatchesData?.filter(
                                    (option) => String(option.invoiceNumber) == String(value),
                                )}
                                // onChange={(val: Account) => onChange(val?.name)}
                                onChange={(selectedOption: InvoiceData | null) => {
                                    if (selectedOption) {
                                        onChange(selectedOption.invoiceNumber)
                                    }
                                }}
                                placeholder="Номер накладной"
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
                <Button
                    // isLoading={isLoading}
                    style={{ background: '#29647C', color: '#fff' }}
                    onClick={handleSubmitForm(sendData)}
                >
                    Отправить
                </Button>
            </Box>
        </>
    )
}

export default Arrival
