import { Box, Button, Input, Select, Textarea } from '@chakra-ui/react'

const Transfer = () => {
    return (
        <>
            <Select placeholder="Со счета">
                <option value={'Kaspi'}>Kaspi</option>
            </Select>
            <Input
                name="sum"
                maxLength={20}
                type="number"
                autoComplete="off"
                placeholder="Сумма *"
                // onChange={handleInputChange}
                // value={formData.sum}
            />
            <Select placeholder="На счет">
                <option value={'Kaspi'}>Kaspi</option>
            </Select>
            <Input
                placeholder="Дата"
                type="date"
                name="date"
                // onChange={handleInputChange}
                // value={formData.date}
            />
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
                    style={{ background: '#29647C', color: '#fff' }}
                    // isLoading={isLoading}
                    // onClick={sendData}
                >
                    Отправить
                </Button>
            </Box>
        </>
    )
}

export default Transfer
