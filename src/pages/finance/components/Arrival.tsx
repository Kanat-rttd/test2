import { ArrivalInputs } from '@/utils/types/finance.types'
import { Box, Button, FormControl, FormErrorMessage, Input, Textarea } from '@chakra-ui/react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

const Arrival = () => {
    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        // reset,
    } = useForm<ArrivalInputs>()

    const sendData = (formData: ArrivalInputs) => {
        console.log(formData)
    }

    return (
        <>
            <FormControl isInvalid={!!errors.sum}>
                <Input
                    maxLength={20}
                    {...register('sum', { required: 'Поле является обязательным' })}
                    autoComplete="off"
                    placeholder="Сумма *"
                    type="number"
                />
                <FormErrorMessage>{errors.sum?.message}</FormErrorMessage>
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
                    rules={{ required: 'Поля является обязательным' }}
                    render={() => {
                        // const { onChange, value } = field
                        return (
                            <Select
                                // options={categories}
                                // getOptionLabel={(option) => option.category}
                                // getOptionValue={(option) => `${option.id}`}
                                // value={categories?.filter((option) => String(option.id) == value)}
                                // onChange={(val) => onChange(val?.id)}
                                placeholder="Выберите счет *"
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.account?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.category}>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Поля является обязательным' }}
                    render={() => {
                        // const { onChange, value } = field
                        return (
                            <Select
                                // options={categories}
                                // getOptionLabel={(option) => option.category}
                                // getOptionValue={(option) => `${option.id}`}
                                // value={categories?.filter((option) => String(option.id) == value)}
                                // onChange={(val) => onChange(val?.id)}
                                placeholder="Категория *"
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.contragent}>
                <Controller
                    name="contragent"
                    control={control}
                    rules={{ required: 'Поля является обязательным' }}
                    render={() => {
                        // const { onChange, value } = field
                        return (
                            <Select
                                // options={categories}
                                // getOptionLabel={(option) => option.category}
                                // getOptionValue={(option) => `${option.id}`}
                                // value={categories?.filter((option) => String(option.id) == value)}
                                // onChange={(val) => onChange(val?.id)}
                                placeholder="Контрагент *"
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.contragent?.message}</FormErrorMessage>
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
