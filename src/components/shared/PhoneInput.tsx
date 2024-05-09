import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { ForwardedRef, forwardRef } from 'react'

/**
 * Phone input with +7 prefix
 */
const PhoneInput = forwardRef((props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <InputGroup size="md">
            <InputLeftAddon>+7</InputLeftAddon>
            <Input ref={ref} type="number" {...props} placeholder="707 110 10 10 *" />
        </InputGroup>
    )
})

export default PhoneInput
