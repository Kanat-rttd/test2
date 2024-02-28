import { Box, Button, Input, Select, Textarea } from '@chakra-ui/react'

const Consumption = () => {
    return (
        <>
            <Input
                name="sum"
                maxLength={20}
                autoComplete="off"
                placeholder="Сумма *"
                type="number"
                // value={formData.sum}
                // onChange={handleInputChange}
            />
            <Input
                placeholder="Дата"
                type="date"
                name="date"
                // value={formData.date}
                // onChange={handleInputChange}
            />
            <Select placeholder="Выберите счет">
                <option value={'Kaspi'}>Kaspi</option>
            </Select>
            <Select placeholder="Категория">
                <option value={'Расходы'}>Расходы</option>
            </Select>
            <Select placeholder="Контрагент">
                <option value={'Райымбек'}>Райымбек</option>
            </Select>
            <Textarea
                placeholder="Комментарий"
                name="comment"
                maxLength={50}
                size="sm"
                resize="none"
                // value={formData.comment}
                // onChange={handleInputChange}
            />
            <Box style={{ width: '100%', textAlign: 'center' }}>
                <Button
                    // isLoading={isLoading}
                    style={{ background: '#29647C', color: '#fff' }}
                    // onClick={sendData}
                >
                    Отправить
                </Button>
            </Box>
        </>
    )
}

export default Consumption
