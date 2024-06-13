import { ArrivalInputs } from '@/utils/types/finance.types'
import { Box, Button, FormControl, FormErrorMessage, Input, Textarea } from '@chakra-ui/react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { createConsumption } from '@/utils/services/finance.service'
import { useNotify } from '@/utils/providers/ToastProvider'
import { ContragentType } from '@/utils/types/contragent.types'
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


const formatOptionLabel = (option: ContragentType) => (
    <div  style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>{option.contragentName}</span>
        <span style={{ marginLeft: '50px', color: '#bfbdbd' }}> {option.type}</span>
    </div>
)

type ArrivalProps = {
    categoriesData: Category[] | undefined
}

const Consumption = ({categoriesData} : ArrivalProps ) => {
    const { loading } = useNotify()

    const { data: contragetnsData } = useApi<ContragentType[]>('contragent?status=Активный')
    // const { data: categoriesData } = useApi<Category[]>(`financeCategories`)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        setValue, 
        formState: { errors },
        reset,
    } = useForm<ArrivalInputs>()

    const sendData = (formData: ArrivalInputs) => {
        const responsePromise: Promise<any> = createConsumption(formData)
        loading(responsePromise)
        responsePromise
            .then(() => {
                reset()
                setValue('amount', null)
                setValue('comment', '')
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
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
                    defaultValue={new Date().toISOString().split('T')[0]}
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

            <FormControl isInvalid={!!errors.contragentId}>
            <Controller
                    name="contragentId"
                    control={control}
                    rules={{ required: 'Поле является обязательным' }}
                    render={({ field }) => {
                        const { onChange, value } = field
                        return (
                            <Select
                                options={contragetnsData}
                                getOptionLabel={(option: ContragentType) =>
                                    `${option.contragentName} - ${option.type}`
                                }
                                getOptionValue={(option: ContragentType) => `${option.id}`}
                                value={contragetnsData?.filter((option) => option.id == value)}
                                onChange={(selectedOption: ContragentType | null) => {
                                    onChange(selectedOption?.id)
                                }}
                                placeholder="Контрагент *"
                                formatOptionLabel={formatOptionLabel}
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.contragentId?.message}</FormErrorMessage>
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

export default Consumption
